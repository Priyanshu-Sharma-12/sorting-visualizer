# Sorting Algorithm Visualizer

An interactive and animated visualization tool built with **React** that demonstrates how different sorting algorithms work.

## 🚀 Features

- 🎨 Visualizes **Bubble**, **Merge**, **Quick**, **Insertion**, **Selection**, and **Heap** Sort
- 📊 Real-time animation of comparisons and swaps
- 🎛️ Speed control slider (10ms to 1000ms)
- ✍️ Step-by-step mode (Next / Previous navigation)
- 📥 Custom array input (comma-separated values)
- 📄 Dynamic pseudocode panel with execution line highlighting
- 💡 Displays algorithm info (time complexity, stability, etc.)
- 💻 Responsive and styled with custom CSS and gradient backgrounds

---

## 📷 Demo

![Sorting Visualizer Screenshot](./screenshot.png) <!-- Add your screenshot here -->

---

## 🧠 Algorithms Included

| Algorithm       | Avg Time | Worst Time | Space | Stable |
|-----------------|-----------|-------------|--------|--------|
| Bubble Sort     | O(n²)     | O(n²)       | O(1)   | ✅ Yes |
| Insertion Sort  | O(n²)     | O(n²)       | O(1)   | ✅ Yes |
| Selection Sort  | O(n²)     | O(n²)       | O(1)   | ❌ No  |
| Merge Sort      | O(n log n)| O(n log n)  | O(n)   | ✅ Yes |
| Quick Sort      | O(n log n)| O(n²)       | O(log n) | ❌ No |
| Heap Sort       | O(n log n)| O(n log n)  | O(1)   | ❌ No  |

---

## 📦 Installation

```bash
git clone https://github.com/your-username/sorting-visualizer.git
cd sorting-visualizer
npm install
npm start
