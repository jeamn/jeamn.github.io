import{_ as a,o as t,c as e,Q as l}from"./chunks/framework.6a4c7ee0.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"algorithm/05.md","filePath":"algorithm/05.md"}'),i={name:"algorithm/05.md"},r=l(`<div class="tip custom-block"><p class="custom-block-title">TIP</p><p>发布日期：<em>2020-12-10</em></p></div><h2 id="二叉树的基本概念" tabindex="-1">二叉树的基本概念 <a class="header-anchor" href="#二叉树的基本概念" aria-label="Permalink to &quot;二叉树的基本概念&quot;">​</a></h2><ul><li>根：有且仅有一个节点的非空树。</li><li>节点：表示树中的元素及若干指向其子树的分支。</li><li>节点的度：一个节点拥有子树数目称为该节点的度。</li><li>叶子节点：度为0的节点。</li><li>孩子：节点子树的根称为该节点的孩子。</li><li>双亲：孩子节点的上层节点称为该节点的双亲。</li><li>兄弟：同一双亲的孩子。</li><li>树的度：一棵树中最大的节点度数。</li><li>节点的层次：从根节点开始定义根为第一层，它的孩子为第二层，以此类推。</li><li>深度：树中节点最大层次的值。</li><li>有序树：树中的各子树自左向右有序的称为有序树。</li><li>无序树：树中的各子树自左向右有序的称为无序树。</li><li>祖先：从根节点到该节点之间的所有节点。</li><li>满二叉树：一棵深度为k且有2^k-1个节点的二叉树。</li><li>完全二叉树：深度为k，n个节点的二叉树，当且仅当其每一个节点都与深度为k的满二叉树中编号从1到n的节点一一对应。</li><li>搜索二叉树：整棵树上没有重复值，以任意节点为头的树，左树上的值都比它小，右树上的值都比它大。</li><li>平衡二叉树：要么是一棵空树，要么任何一个节点的左右子树高度差的绝对值不超过1。</li></ul><h2 id="递归方式实现二叉树的先序、中序、后序遍历" tabindex="-1"><strong>递归方式实现二叉树的先序、中序、后序遍历</strong> <a class="header-anchor" href="#递归方式实现二叉树的先序、中序、后序遍历" aria-label="Permalink to &quot;**递归方式实现二叉树的先序、中序、后序遍历**&quot;">​</a></h2><ol><li>理解递归序：任何一个节点可以被经过3次</li><li>先序、中序、后序都可以在递归序的基础上加工出来</li><li>第一次到达一个节点就打印就是先序、第二次打印即中序、第三次即后序</li></ol><h2 id="非递归方式实现二叉树的先序、中序、后序遍历" tabindex="-1"><strong>非递归方式实现二叉树的先序、中序、后序遍历</strong> <a class="header-anchor" href="#非递归方式实现二叉树的先序、中序、后序遍历" aria-label="Permalink to &quot;**非递归方式实现二叉树的先序、中序、后序遍历**&quot;">​</a></h2><ol><li>任何递归函数都可以改成非递归</li><li>自己设计压栈的方式来实现</li></ol><h3 id="用非递归方式实现二叉树的先序遍历-根左右" tabindex="-1">用非递归方式实现二叉树的<strong>先序遍历（根左右）</strong> <a class="header-anchor" href="#用非递归方式实现二叉树的先序遍历-根左右" aria-label="Permalink to &quot;用非递归方式实现二叉树的**先序遍历（根左右）**&quot;">​</a></h3><pre><code>1. 申请一个新的栈，记为 stack，然后将头节点 head 压入 stack 中；
2. 从 stack 中弹出栈顶节点，记为 cur，然后打印 cur 节点的值；再将节点 cur 的右孩子节点（不为空的话）先压入 stack 中，最后将 cur 的左孩子节点（不为空的话）压入 stack 中；
3. 不断重复步骤2，直到 stack 为空，结束。
</code></pre><h3 id="用非递归方式实现二叉树的中序遍历-左根右" tabindex="-1"><strong>用非递归方式实现二叉树的中序遍历（左根右）</strong> <a class="header-anchor" href="#用非递归方式实现二叉树的中序遍历-左根右" aria-label="Permalink to &quot;**用非递归方式实现二叉树的中序遍历（左根右）**&quot;">​</a></h3><pre><code>1. 申请一个新的栈，记为 stack。初始时，令变量 cur = head；
2. 先把 cur 节点压入栈中，对以 cur 节点为头节点的整棵子树来说，依次把左边界压入栈中，即不停地令 cur = cur.left，然后重复步骤2；
3. 不断重复步骤2，直到发现 cur 为空，此时从 stack 中弹出一个节点，记为 node。打印 node 的值，并且让 cur = node.right，然后继续重复步骤2；
4. 当 stack 为空且 cur 为空时，结束。
</code></pre><h3 id="用非递归方式实现二叉树的后序遍历-左右根" tabindex="-1"><strong>用非递归方式实现二叉树的后序遍历（左右根）</strong> <a class="header-anchor" href="#用非递归方式实现二叉树的后序遍历-左右根" aria-label="Permalink to &quot;**用非递归方式实现二叉树的后序遍历（左右根）**&quot;">​</a></h3><pre><code>两种方法：

- 第一种，两个栈实现，

	1. 申请一个栈 s1，然后将头节点 head 压入 s1 中；
	2. 从 s1 中弹出的节点记为 cur，然后依次将 cur 的左孩子节点和右孩子节点压入 s1 中；
	3. 在整个过程中，每一个从 s1 中弹出的节点都放进另一个栈 s2 中；
	4. 不断重复步骤2和步骤3，直到 s1 为空，结束。
	5. 从 s2 中依次弹出节点并打印，打印的顺序就是后序遍历的顺序。

- 第二种，一个栈实现，

	1. 申请一个栈，记为 stack，将头节点压入 stack，同时设置两个变量 h 和 c。在整个流程中，h 代表最近一次弹出并打印的节点，c 代表 stack 的栈顶节点，初始时 h 为头节点，c 为 null。
	2. 每次令 c 等于当前 stack 的栈顶节点，但是不从 stack 中弹出，此时分以下三种情况：
		1. 如果 c 的左孩子节点不为 null，并且 h 不等于 c 的左孩子节点，也不等于 c 的右孩子节点，则把 c 的左孩子节点压入 stack 中；
		2. 如果条件1不成立，并且 c 的右孩子节点不为 null，h 不等于 c 的右孩子节点，则把 c 的右孩子节点压入 stack 中；
		3. 如果条件1和条件2都不成立，说明 c 的左子树和右子树都已经打印完毕，那么从 stack 中弹出 c 并打印，然后令 h=c；
	3.  一直重复步骤2，直到 stack 为空，结束。
</code></pre><h4 id="后继节点的概念" tabindex="-1"><em><strong>后继节点的概念？</strong></em> <a class="header-anchor" href="#后继节点的概念" aria-label="Permalink to &quot;***后继节点的概念？***&quot;">​</a></h4><p>一棵树在中序遍历情况下，一个节点后面的节点即为该节点的后继节点。</p><h4 id="如何查找后继节点" tabindex="-1"><em><strong>如何查找后继节点？</strong></em> <a class="header-anchor" href="#如何查找后继节点" aria-label="Permalink to &quot;***如何查找后继节点？***&quot;">​</a></h4><p>先看该节点是否有右孩子，如果有，右子树的最左节点就是后继节点；</p><p>如果没有右孩子，就向父级查找，如果该节点是其父节点的右孩子，继续往上，直到该节点为其父节点的左孩子，那么其父节点即为该节点的后继节点。如果向上一直找不到，则没有后继节点。</p>`,18),c=[r];function n(o,s,h,d,u,k){return t(),e("div",null,c)}const _=a(i,[["render",n]]);export{m as __pageData,_ as default};
