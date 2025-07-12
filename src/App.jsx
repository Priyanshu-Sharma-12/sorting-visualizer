import { useState, useEffect, useRef } from "react";
import "./App.css";
import BarChart from "./components/BarChart";

import { getBubbleSortAnimations } from "./sortingAlgorithms/bubbleSort";
import { getMergeSortAnimations } from "./sortingAlgorithms/mergeSort";
import { getQuickSortAnimations } from "./sortingAlgorithms/quickSort";
import { getInsertionSortAnimations } from "./sortingAlgorithms/insertionSort";
import { getSelectionSortAnimations } from "./sortingAlgorithms/selectionSort";
import { getHeapSortAnimations } from "./sortingAlgorithms/heapSort";

function App() {
  const [array, setArray] = useState([]);
  const arrayRef = useRef([]);
  const [barColors, setBarColors] = useState([]);
  const [selectedAlgo, setSelectedAlgo] = useState("bubble");
  const [comparisonCount, setComparisonCount] = useState(0);
  const [swapCount, setSwapCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [animationIndex, setAnimationIndex] = useState(0);
  const [animationsList, setAnimationsList] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  let animationTimer = useRef(null);
  const [speed, setSpeed] = useState(100);
  const speedRef = useRef(speed);
  const [customInput, setCustomInput] = useState("");
  const [algoInfo, setAlgoInfo] = useState("");
  const [isStepMode, setIsStepMode] = useState(false);
  const [currentLine, setCurrentLine] = useState(null);

  const pseudocodeMap = {
    bubble: [
      "for i = 0 to n-1",
      "  for j = 0 to n-i-1",
      "    if arr[j] > arr[j+1]",
      "      swap arr[j] and arr[j+1]"
    ],
    insertion: [
      "for i = 1 to n-1",
      "  key = arr[i]",
      "  j = i - 1",
      "  while j >= 0 and arr[j] > key",
      "    arr[j+1] = arr[j]",
      "    j--",
      "  arr[j+1] = key"
    ],
    selection: [
      "for i = 0 to n-1",
      "  min_idx = i",
      "  for j = i+1 to n",
      "    if arr[j] < arr[min_idx]",
      "      min_idx = j",
      "  swap arr[min_idx] and arr[i]"
    ],
    merge: [
      "if l < r",
      "  mid = (l + r) / 2",
      "  mergeSort(arr, l, mid)",
      "  mergeSort(arr, mid+1, r)",
      "  merge(arr, l, mid, r)"
    ],
    quick: [
      "if low < high",
      "  pi = partition(arr, low, high)",
      "  quickSort(arr, low, pi-1)",
      "  quickSort(arr, pi+1, high)"
    ],
    heap: [
      "buildMaxHeap(arr)",
      "for i = n-1 to 1",
      "  swap arr[0] and arr[i]",
      "  heapify(arr, 0, i)"
    ]
  };
  const pseudocode = pseudocodeMap[selectedAlgo] || [];

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const temp = Array.from(
      { length: 50 },
      () => Math.floor(Math.random() * 300) + 20
    );
    setArray(temp);
    arrayRef.current = temp;
    setBarColors(Array(50).fill("steelblue"));
    setComparisonCount(0);
    setSwapCount(0);
    setIsPaused(false);
    setIsSorting(false);
    setAnimationIndex(0);
    if (animationTimer.current) clearTimeout(animationTimer.current);
  };
  const handleCustomArray = () => {
    const nums = customInput
      .split(",")
      .map((n) => parseInt(n.trim(), 10))
      .filter((n) => !isNaN(n) && n > 0);

    if (nums.length === 0 || nums.length > 100) {
      alert("Please enter between 1 and 100 valid positive integers.");
      return;
    }

    setArray(nums);
    arrayRef.current = nums;
    setBarColors(Array(nums.length).fill("steelblue"));
    setComparisonCount(0);
    setSwapCount(0);
    setIsPaused(false);
    setIsSorting(false);
    setAnimationIndex(0);
    if (animationTimer.current) clearTimeout(animationTimer.current);
  };

  const startSort = () => {
    if (isSorting) return;
    let animations = [];
    switch (selectedAlgo) {
      case "bubble":
        animations = getBubbleSortAnimations(array);
        break;
      case "merge":
        animations = getMergeSortAnimations(array);
        break;
      case "quick":
        animations = getQuickSortAnimations(array);
        break;
      case "insertion":
        animations = getInsertionSortAnimations(array);
        break;
      case "selection":
        animations = getSelectionSortAnimations(array);
        break;
      case "heap":
        animations = getHeapSortAnimations(array);
        break;
      default:
        return;
    }
    setAnimationsList(animations);
    setIsSorting(true);
    setAnimationIndex(0);
    setIsPaused(false);
    animateStep(animations, 0);

    const infoMap = {
      bubble: "🫧 Bubble Sort: Stable | Avg: O(n²) | Worst: O(n²) | Space: O(1)",
      merge: "🪄 Merge Sort: Stable | Avg: O(n log n) | Space: O(n)",
      quick: "⚡ Quick Sort: Unstable | Avg: O(n log n) | Worst: O(n²)",
      insertion: "✍️ Insertion Sort: Stable | Best: O(n) | Avg: O(n²)",
      selection: "🔍 Selection Sort: Unstable | Avg: O(n²)",
      heap: "🏰 Heap Sort: Unstable | Avg: O(n log n)",
    };
    setAlgoInfo(infoMap[selectedAlgo]);
  };

  const animateStep = (animations, index) => {
    if (index >= animations.length) {
      setIsSorting(false);
      return;
    }
    const arr = arrayRef.current.slice();
    const colors = Array(arr.length).fill("steelblue");
    const animation = animations[index];
    if (animation.type === "compare") setCurrentLine(2);
    else if (animation.type === "swap" || animation.type === "overwrite") setCurrentLine(3);
    const { type, indices, index: idx, value } = animation;

    if (type === "compare") {
      setComparisonCount((prev) => prev + 1);
      const [a, b] = indices;
      colors[a] = "red";
      colors[b] = "red";
      setBarColors([...colors]);
      setTimeout(() => {
        colors[a] = "steelblue";
        colors[b] = "steelblue";
        setBarColors([...colors]);
      }, 100);
    } else if (type === "swap") {
      setSwapCount((prev) => prev + 1);
      const [a, b] = indices;
      [arr[a], arr[b]] = [arr[b], arr[a]];
      colors[a] = "green";
      colors[b] = "green";
      setArray([...arr]);
      arrayRef.current = arr;
      setBarColors([...colors]);
    } else if (type === "overwrite") {
      setSwapCount((prev) => prev + 1);
      arr[idx] = value;
      colors[idx] = "green";
      setArray([...arr]);
      arrayRef.current = arr;
      setBarColors([...colors]);
    }

    if (isPaused) {
      setAnimationIndex(index); 
      return;
    } else {
      if (isStepMode) {
        setAnimationIndex(index + 1);
        return;
      }
      animationTimer.current = setTimeout(() => {
        setAnimationIndex(index + 1);
        animateStep(animations, index + 1);
      }, speedRef.current);
    }
  };

  return (
    <div className="app-content">
      <div className="main-content">
        <div className="app">
          <h1>Sorting Algorithm Visualizer</h1>

          <div className="controls">
            <div className="control-group">
              <select
                onChange={(e) => setSelectedAlgo(e.target.value)}
                value={selectedAlgo}
              >
                <option value="bubble">Bubble Sort</option>
                <option value="merge">Merge Sort</option>
                <option value="quick">Quick Sort</option>
                <option value="insertion">Insertion Sort</option>
                <option value="selection">Selection Sort</option>
                <option value="heap">Heap Sort</option>
              </select>
              <button onClick={resetArray}>New Array</button>
              <button onClick={startSort}>Start {selectedAlgo}</button>
              
            </div>
            <div>{isStepMode && (
              <div className="step-controls">
                <button onClick={() => animateStep(animationsList, Math.max(animationIndex - 1, 0))}>
                  Previous
                </button>
                <button onClick={() => animateStep(animationsList, animationIndex)}>
                  Next
                </button>
              </div>
            )}
            <div style={{ marginTop: "10px" ,color:"black" }}>
              <label>
                <input
                  type="checkbox"
                  checked={isStepMode}
                  onChange={() => setIsStepMode(!isStepMode)}
                />
                Step-by-step mode
              </label>
            </div></div>
            <div className="speed-control">
              
              <label style={{color:"black"}}>Speed:</label>
              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={speed}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setSpeed(val);
                  speedRef.current = val;
                }}
              />
              <span>{speed} ms</span>
            </div>
            <div className="custom-input">
              <input
                type="text"
                placeholder="e.g., 10, 25, 5, 30"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
              />
              <button onClick={handleCustomArray}>Set Array</button>
            </div>
          </div>

          <BarChart array={array} barColors={barColors} />

          <div className="counter" style={{color:"black"}}>
            Comparisons: {comparisonCount} | Swaps: {swapCount}
          </div>
        </div>
      </div>
      <div className="pseudocode-panel">
        <h3>Pseudocode</h3>
        <pre>
          {pseudocode.map((line, i) => (
            <div
              key={i}
              style={{
                backgroundColor: currentLine === i ? "yellow" : "transparent",
                padding: "2px 4px",
                color: "black",
              }}
            >
              {line}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

export default App;
