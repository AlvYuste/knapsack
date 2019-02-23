# Knapsack problem

We have a set of items, each one with its value and its weight. And we have only one knapsack with a specific weight capacity. Our objective is to **choose which items to take** to **maximize the value** inside the knapsack, respecting the **weight limit**.

## Greedy algorithms

Very ease to implement and can be very fast to execute. But the solution quality may vary depending on the input.

- **More items is best**: Start with small ones and take as many as you can.
- **Valuable items are best**: Start with more valuable items.
- **Value density is best**: Start with more dense items: density is value per kilo.

They have no quality guaranties.

## Modeling

Formalization of an optimization task. Giving names to variables and writing down the objectives and limits with mathematical expressions.

- **Item count**: The number of items that we have in total.
  $$n$$
- **The knapsack capacity**: The maximum weight that the knapsack can hold.
  $$K$$
- **Items set**: The set of items I numbered from $1$ to $n$. Each item has an arbitrary index $i$.

$$
i \in I$$
- **Item value**: The value of each item. The number $v_i$ represents the value of item $i$.
$$

- **Item weight**: The weight of each item. The number $w_i$ represents the weight of item $i$.
  $$w_i \\ W = \{w_1, w_2,...w_n\}$$
- **Decision values**: They determinate whether we take or not take each item $i$. If $x_i=1$ it means that we take item $i$, if $x_i = 0$ means that we don't take it.
  $$x_i \in \{0, 1\}$$
- **Limit**: We cannot choose items that sum a weight greater that the knapsack capacity.
  $$\sum_{i=1}^n x_i·w_i \leqslant K$$
- **Objective**: We have to take items in order to have as much value as possible.
  $$\max_{x_i \in \{0, 1\}} \sum_{i=1}^n x_i·v_i$$
- **Optimal solution**: The values of each $x_i$ to maximize the objetive respecting the limit. For a given number of items $n$ and a capacity of the knapsack $K$, we call this function $O(K, n)$.

$$
	i \in 1..n \\
	x_i \in \{0, 1\} \\
	\sum_{i=1}^n x_i·w_i \leqslant K \\
	\max \sum_{i=1}^n x_i·v_i
\end{cases}$$
## Dynamic programming

Technique that finds the **optimal solution**. It applies the principle **"divide and conquer"**. Instead of calculating the whole $O(K,n)$ it takes a **subset of items** of length $j \in 0..n$, and tries to calculate the optimal solution counting on a knapsack of capacity $k \leqslant K$, having: $O(k, j)$.

Beside this approach we use a **"bottom up" computation** technique. We assume that, given the subset of length $j$, we already know the optimal solution of the subset of length $j -1$ for all possible $k \in 0..K$. So we know $O(k, j-1)$, which we are calling $P$ for simplicity.

Counting on that, we have reduced the decision to: whether to take or not to take the item number $j$, i.e., determining the value of $x_j$. And this decision is very simple:

If the item $j$ don't fits in the knapsack because $w_j \leqslant k$, then we cannot choose it so $O(k,j) = P$. Otherwise. if it fits, we should decide if we take it or not determining which decision maximizes the final value:
- If we don't take it we have the same value as before: $O(k,j) = P$.
- But if we take it we have to sum the value of this particular item $v_j$, plus the optimal solution of the previous subset given the size left after taking this item, this is:
$$

Remember that we assume we know the optimal solution for the subset $j-1$ for all possible $k \in 0..K$, including therefore $k-w_j$.

Putting all together, the final recursive formula is the following:

$$
O(k,j) =
\begin{cases}
	P & \text{if } w_j \leqslant k\\
	max(P, v_j + O(k-w_j, j-1)) & \text{otherwise}
\end{cases}
$$

This **recursion** ends when we reach $j = 0$, which always give $O(k,0) = 0$. But still, trying to solve the problem with this recursion is **very inefficient**, exponential, because we have to recalculate most items multiple times.

A smarter approach is to start from $O(k,0)$ and keep adding items until $O(k, n)$. We usually represent this approach on a table with $n+1$ columns and $K+1$ rows, to consider the cases $j=0$ and $k=0$. For example, given:

$$
n = 3\\
K = 9\\
V = \{5, 6, 3\} \\
W = \{4, 5, 2\} \\
$$

Subject to:
$$4x_1 + 5x_2 + 2x_3 \leqslant K$$

Maximize:
$$5x_1 + 6x_2 + 3x_3$$

The resultant table would be:

| $O(k,j)$ | $j=0$ | $j=1$   | $j=2$   | $j=3$   |
| -------- | ----- | ------- | ------- | ------- |
| $k = 0$  | 0     | 0       | 0       | 0       |
| $k = 1$  | 0     | 0       | 0       | 0       |
| $k = 2$  | 0     | 0       | 0       | **3**   |
| $k = 3$  | 0     | 0       | 0       | 3       |
| $k = 4$  | 0     | **5**   | **5**   | **5**   |
| $k = 5$  | 0     | 5       | **6**   | 6       |
| $k = 6$  | 0     | 5       | 6       | **8**   |
| $k = 7$  | 0     | 5       | 6       | 9       |
| $k = 8$  | 0     | 5       | 6       | 9       |
| $k = 9$  | 0     | 5       | **11**  | **11**  |
| **V**    |       | $v_1=5$ | $v_2=6$ | $v_3=3$ |
| **W**    |       | $w_1=4$ | $w_2=5$ | $w_3=2$ |

Based on the built table we can assure that $O(K, n) = 11$, and the decisions made are $X = \{1, 1, 0\}$.

The cost of this approach is building the table, so it is pseudo-polynomial, but still not very efficient when $K$ becomes larger.

## Branch and bound

We can represent the problem with a **binary decision tree**, each level representing the decision of taking or not taking an item. The resultant tree would have $n$ levels then.

The simplest way to find optimal solution exploring this tree is by **exhaustive search** technique. But, the cost of this is exponential, based on the value of items. So our aim here is to minimize the portion of the tree that we have to explore.

Here comes **branch and bound**. It relies on an **optimistic estimation** of what we can achieve exploring a certain subtree. If that estimation is lower than a solution that we already have we can discard that subtree.
