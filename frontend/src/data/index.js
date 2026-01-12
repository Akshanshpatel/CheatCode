import { arrayData } from "@/data/Arrays";
import { twoPoint } from "@/data/twoPointer";
import { oneDim} from "@/data/oneDim";
import { twoDim} from "@/data/twoDim";
import { bit} from "@/data/bit";
import { bs} from "@/data/bs";
import { graph} from "@/data/graph";
import { heapPQ} from "@/data/heapPQ";
import { LL} from "@/data/LL";
import { math} from "@/data/math";
import { Sliding} from "@/data/Sliding";
import { stackQueue} from "@/data/stackQueue";
import { tree} from "@/data/tree";
import { missi} from "@/data/miscellaneous";
import { recursi} from "@/data/recursion";
import { greedy} from "@/data/greedy";

export const topics = [
     {
       id: "arrays-hashing",
       title: "Arrays & Hashing",
       problems: arrayData,
      },
      {
        id: "two-pointers",
        title: "Two Pointers",
        problems: twoPoint,
      },
      {
        id: "sliding",
        title: "Sliding Window",
        problems: Sliding,
      },
      {
        id: "bin-search",
        title: "Binary Search",
        problems: bs,
      },
      {
        id: "stak-queue",
        title: "Stack",
        problems: stackQueue,
      },
      {
        id: "recursi",
        title: "Recursion & Backtracking",
        problems: recursi,
      },
      {
    id: "heap-pq",
    title: "Heap & Priority queue",
    problems: heapPQ,
  },
      {
        id: "ll",
        title: "Linked List",
        problems: LL,
      },
      {
        id: "tree",
        title: "Trees (Binary)",
        problems: tree,
      },
      {
        id: "one-dim",
        title: "1-D Dynamic Programming",
        problems: oneDim,
  },
  {
    id: "two-dim",
    title: "2-D Dynamic Programming",
    problems: twoDim,
  },
  {
    id: "greedy",
    title: "Greedy",
    problems: greedy,
  },
  {
    id: "bit-manipulation",
    title: "Bit Manipulation",
    problems: bit,
  },
  
  {
    id: "graph",
    title: "Graph",
    problems: graph,
  },
  {
    id: "math",
    title: "Math & Geometry",
    problems: math,
  },
  {
    id: "missi",
    title: "Miscellaneous ",
    problems: missi,
  },
];