import { useState, useRef } from "react";
import {
  ChevronDown,
  SquareCheckBig,
  Star,
  X,
} from "lucide-react";
import {
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { GoogleLogin } from "@react-oauth/google";

export default function TopicView({
  topics,
  topicProblems,
  openMap,
  setOpenMap,
  setTopicProblems,
  user,
  toggleSolved,
  toggleStarred,
}) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authError, setAuthError] = useState(null);
  const pendingActionRef = useRef(null);

  const toggleTopic = (id) => {
    setOpenMap(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const executeToggle = async (uid, problemId, currentDone, topicId, isStar) => {
    const field = isStar ? "star" : "done";
    if (isStar) {
      await toggleStarred(uid, problemId, currentDone);
    } else {
      await toggleSolved(uid, problemId, currentDone);
    }
    setTopicProblems((prev) => ({
      ...prev,
      [topicId]: prev[topicId].map((x) =>
        x.id === problemId ? { ...x, [field]: !x[field] } : x
      ),
    }));
  };

  const handleToggle = (p, topicId, isStar) => {
    const field = isStar ? "star" : "done";

    if (!user) {
      pendingActionRef.current = { problemId: p.id, currentDone: p[field], topicId, isStar };
      setShowAuthModal(true);
      setAuthError(null);
      return;
    }

    executeToggle(user.uid, p.id, p[field], topicId, isStar).catch((err) => {
      console.error("Failed to update progress:", err);
    });
  };

  const signInInProgressRef = useRef(false);

  const handleGoogleSuccess = async (credentialResponse) => {
    if (signInInProgressRef.current) return;
    signInInProgressRef.current = true;
    try {
      const { credential } = credentialResponse;
      const firebaseCredential = GoogleAuthProvider.credential(credential);
      const result = await signInWithCredential(auth, firebaseCredential);
      const currentUser = result.user;
      const action = pendingActionRef.current;
      if (action) {
        pendingActionRef.current = null;
        await executeToggle(currentUser.uid, action.problemId, action.currentDone, action.topicId, action.isStar);
        setShowAuthModal(false);
        setAuthError(null);
      }
    } catch (err) {
      console.error("Sign-in failed:", err);
      setAuthError("Sign-in failed. Please try again.");
    } finally {
      signInInProgressRef.current = false;
    }
  };

  const handleGoogleError = () => {
    if (signInInProgressRef.current) return;
    setAuthError("Sign-in failed. Please try again.");
  };

  return (
    <div className="mt-10 mx-auto">
      {topics.map(topic => {
        const open = !!openMap[topic.id];
        const problems = topicProblems[topic.id] || [];

        const solvedCount = problems.filter(p => p.done).length;
        const totalCount = problems.length;
        const progressPercent = totalCount
          ? Math.round((solvedCount / totalCount) * 100)
          : 0;

        return (
      <div key={topic.id} className="mb-5">
          {/* HEADER */}
          <button
            onClick={() => toggleTopic(topic.id)}
            className="
              mx-auto w-full sm:w-9/12
              cursor-pointer
              bg-(--box-qt)
              text-(--font-color)
              font-bold rounded-lg
              px-4 sm:px-6 py-3
              flex flex-col sm:flex-row
              sm:items-center gap-2
              border border-(--font-color)/20
              hover:border-(--font-color)/60
              transition-colors duration-200
            "
          >
            <div className="flex items-center w-full min-w-0">
              <ChevronDown
                className={`transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
              <span className="ml-3 truncate">{topic.title}</span>
              <span className="ml-auto text-sm">
                {solvedCount}/{totalCount}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full sm:w-40 h-2 bg-(--font-color)/20 overflow-hidden rounded">
              <div
                className="h-full bg-emerald-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </button>

          {/* ACCORDION */}
          {open && (
            <div
              className="
                mx-auto w-full sm:w-11/12 lg:w-7/12 mt-2
                bg-(--box-qt)
                rounded-lg
                border border-(--font-color)/20
              "
            >
              {/* Headings */}
              <div
                className="
                  hidden md:grid font-bold grid-cols-6
                  px-4 py-2
                  border-b border-(--font-color)/20
                  text-(--secondary-color)
                "
              >
                <span>Status</span>
                <span>Star</span>
                <span className="col-span-2">Problem</span>
                <span className="pl-10">Difficulty</span>
                <span>Solution</span>
              </div>

              {problems.map((p) => (
                <div
                  key={p.id}
                  className={`
                    grid grid-cols-1 md:grid-cols-6
                    gap-3 md:gap-0 px-4 py-3
                    border-b border-(--font-color)/10
                    ${
                      p.done
                        ? "bg-(--accordian) text-white"
                        : "text-(--font-color)"
                    }
                  `}
                >
                  {/* Solved */}
                  <div className="flex md:contents gap-4">
                    <button
                      onClick={() => handleToggle(p, topic.id, false)}
                    >
                      <SquareCheckBig
                        className={`w-6 h-6 cursor-pointer ${
                          p.done
                            ? "fill-amber-400 text-black"
                            : "fill-transparent text-(--font-color)"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Star */}
                  <div className="flex md:contents gap-4">
                    <button
                      onClick={() => handleToggle(p, topic.id, true)}
                    >
                      <Star
                        className={`w-6 h-6 cursor-pointer ${
                          p.star
                            ? "fill-amber-400 text-black"
                            : "text-(--font-color)"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Problem */}
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="md:col-span-2 min-w-0"
                  >
                    <span className="block whitespace-normal text-(--text) font-bold hover:text-(--primary-color)">
                      {p.title}
                    </span>
                  </a>

                  {/* Difficulty (semantic colors stay) */}
                  <span className="text-sm md:text-base">
                    <span
                      className={`md:pl-10 ${
                        p.difficulty === "Easy"
                          ? "text-green-700 font-semibold"
                          : p.difficulty === "Medium"
                          ? "text-yellow-500 font-semibold"
                          : "text-red-500 font-semibold"
                      }`}
                    >
                      {p.difficulty}
                    </span>
                  </span>

                  {/* Solution */}
                  <span className="text-(--secondary-color)">Soon</span>
                </div>
              ))}
            </div>
          )}
        </div>

        );
      })}

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => {
              setShowAuthModal(false);
              pendingActionRef.current = null;
              setAuthError(null);
            }}
          />
          <div className="relative bg-(--bg-color) border border-(--font-color)/20 rounded-lg p-6 w-80 shadow-xl">
            <button
              onClick={() => {
                setShowAuthModal(false);
                pendingActionRef.current = null;
                setAuthError(null);
              }}
              className="absolute top-2 right-2 text-(--font-color) cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <p className="text-(--font-color) text-sm mb-4">
              Please sign in to track your progress.
            </p>
            {authError && (
              <p className="text-red-500 text-xs mb-3">{authError}</p>
            )}
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="outline"
                size="large"
                text="continue_with"
                shape="rectangular"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
