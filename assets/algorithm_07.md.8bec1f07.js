import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.6a4c7ee0.js";const C=JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"algorithm/07.md","filePath":"algorithm/07.md"}'),p={name:"algorithm/07.md"},o=l(`<div class="tip custom-block"><p class="custom-block-title">TIP</p><p>发布日期：<em>2020-12-25</em></p></div><h2 id="一、单调栈" tabindex="-1">一、单调栈 <a class="header-anchor" href="#一、单调栈" aria-label="Permalink to &quot;一、单调栈&quot;">​</a></h2><p>求数组中每个元素，左边离它最近的比它小的数在哪，右边离它最近的比它小的数在哪。</p><p>暴力解法：遍历，复杂度为O(n^2)</p><p>较优解：单调栈，复杂度为 O(n)</p><p>已知数组 [3，4，2，5，6，0，1]</p><p>思路：</p><p>（1）先假设数组中无重复值；（2）让栈底到栈顶，从小到大；（3）出栈的时候做记录；</p><p>（4）让某个数出栈的数，即为该数的右边离它最近的比它小的数；（5）某个数压着的数，即为该数的左边离它最近的比它小的数；（6）每个数必须入栈一次出栈一次；</p><p>出入栈顺序：3入，4入，4出记录4（左3右2），3出记录3（左无右2），2入，5入，6入，6出记录6（左5右0），5出记录5（左2右0），2出记录2（左无右0），1入，1出（左0右无），0出（左无右无）</p><h2 id="二、滑动窗口" tabindex="-1">二、滑动窗口 <a class="header-anchor" href="#二、滑动窗口" aria-label="Permalink to &quot;二、滑动窗口&quot;">​</a></h2><h3 id="滑动窗口是什么" tabindex="-1">滑动窗口是什么？ <a class="header-anchor" href="#滑动窗口是什么" aria-label="Permalink to &quot;滑动窗口是什么？&quot;">​</a></h3><ul><li>一种想象出来的数据结构</li><li>具有左边界 L 和右边界 R</li><li>在数组或者字符串或者一个序列上，记为 S，窗口就是S[L...R]这一部分</li><li>L 往右滑意味着一个样本出了窗口，R 往右滑意味着一个样本进了窗口</li><li>L 和 R 都只能往右滑，且 L 不大于 R</li></ul><h3 id="滑动窗口内最大值和最小值的更新结构" tabindex="-1">滑动窗口内最大值和最小值的更新结构 <a class="header-anchor" href="#滑动窗口内最大值和最小值的更新结构" aria-label="Permalink to &quot;滑动窗口内最大值和最小值的更新结构&quot;">​</a></h3><ul><li><p>窗口不管是 L 还是 R 滑动之后，都会让窗口呈现新状况。</p></li><li><p>如何能够更快地得到窗口当前状况下的最大值和最小值？</p></li><li><p>采取遍历的方式去寻找最大值，复杂度是 O(n)，性能较差。</p></li><li><p>最好平均下来复杂度能做到 O(1)，所以，</p><p>利用单调双端队列（双向链表），即，一个数据可以从双端队列的头部进头部出，也可以从尾部进尾部出。</p></li></ul><h3 id="最大值的获取过程-最小值同理" tabindex="-1">最大值的获取过程（最小值同理）： <a class="header-anchor" href="#最大值的获取过程-最小值同理" aria-label="Permalink to &quot;最大值的获取过程（最小值同理）：&quot;">​</a></h3><p>原则：保证双端队列中的数，从左往右是从大到小</p><ul><li>L 往右移动，出的时候判断： <ul><li>双端队列头部的数是否是可以移出的（对比下标）： <ul><li>如果是，则双端队列中的数从头部出；</li><li>如果不是，不做操作；</li></ul></li></ul></li><li>R 往右移动，双端队列中的数从尾部进，进的时候需要判断： <ul><li>当前双端队列尾部的数是否大于即将进的数： <ul><li>如果是，则进数；</li><li>如果不是，则将双端队列尾部的数移出，再进数。</li></ul></li></ul></li></ul><p>则，此时双端队列头部的数，就是每次窗口状况的最大值。</p><p>双端队列可以解释成：哪些数会成为当前窗口最大值的优先级，左边优先级最高。</p><p>注意：双端队列中存放的是位置下标而不是具体的值，目的是为了判断头部数据是否能移除。</p><h3 id="举个-🌰" tabindex="-1">举个 🌰 <a class="header-anchor" href="#举个-🌰" aria-label="Permalink to &quot;举个 🌰&quot;">​</a></h3><p>假设一个固定大小为 W 的窗口，依次划过 arr，返回每一次滑出状况的最大值</p><p>例如：arr = [4,3,5,4,3,3,6,7]，W = 3</p><p>返回：[5,5,5,4,6,7]</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SlidingWindowMaxArray</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">arr</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">w</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(arr </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> w </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> arr.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> w){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">qmax</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> []</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">res</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> []</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> index </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">R</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; </span><span style="color:#79B8FF;">R</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> arr.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">; </span><span style="color:#79B8FF;">R</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;">(qmax.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> arr[qmax[qmax.</span><span style="color:#79B8FF;">length</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">]] </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> arr[</span><span style="color:#79B8FF;">R</span><span style="color:#E1E4E8;">]){</span></span>
<span class="line"><span style="color:#E1E4E8;">            qmax.</span><span style="color:#B392F0;">pop</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        qmax.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">R</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// 0 1 2 3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 如果窗口没有形成W的长度之前，不弹出数字</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(qmax[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">R</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> w){</span></span>
<span class="line"><span style="color:#E1E4E8;">            qmax.</span><span style="color:#B392F0;">shift</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 以上把窗口更新做完了</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 如果窗口没有形成W的长度之前，不收集头部的值</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">R</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;=</span><span style="color:#E1E4E8;"> w</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">){ </span></span>
<span class="line"><span style="color:#E1E4E8;">            res[index</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr[qmax[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">]];</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> res;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">SlidingWindowMaxArray</span><span style="color:#E1E4E8;">([</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">7</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">9</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">8</span><span style="color:#E1E4E8;">], </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">))</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SlidingWindowMaxArray</span><span style="color:#24292E;">(</span><span style="color:#E36209;">arr</span><span style="color:#24292E;">, </span><span style="color:#E36209;">w</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(arr </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> w </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> arr.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> w){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">qmax</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> []</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">res</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> []</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> index </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">R</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; </span><span style="color:#005CC5;">R</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> arr.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">; </span><span style="color:#005CC5;">R</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">while</span><span style="color:#24292E;">(qmax.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> arr[qmax[qmax.</span><span style="color:#005CC5;">length</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">]] </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> arr[</span><span style="color:#005CC5;">R</span><span style="color:#24292E;">]){</span></span>
<span class="line"><span style="color:#24292E;">            qmax.</span><span style="color:#6F42C1;">pop</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        qmax.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">R</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// 0 1 2 3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 如果窗口没有形成W的长度之前，不弹出数字</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(qmax[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">R</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> w){</span></span>
<span class="line"><span style="color:#24292E;">            qmax.</span><span style="color:#6F42C1;">shift</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 以上把窗口更新做完了</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 如果窗口没有形成W的长度之前，不收集头部的值</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">R</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;=</span><span style="color:#24292E;"> w</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">){ </span></span>
<span class="line"><span style="color:#24292E;">            res[index</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr[qmax[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">]];</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> res;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">SlidingWindowMaxArray</span><span style="color:#24292E;">([</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">5</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">7</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">9</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">8</span><span style="color:#24292E;">], </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">))</span></span></code></pre></div><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SlidingWindowMaxArray</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;">[] </span><span style="color:#B392F0;">getMaxWindow</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">arr</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">w</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(arr </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> w </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> arr.length </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> w){</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 其中放的是位置，从大到小</span></span>
<span class="line"><span style="color:#E1E4E8;">        LinkedList&lt;</span><span style="color:#F97583;">Integer</span><span style="color:#E1E4E8;">&gt; qmax </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;">  LinkedList&lt;</span><span style="color:#F97583;">Integer</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;">[] res </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;">[arr.length </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> w </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> index </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> R </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; R </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> arr.length; R</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">qmax.</span><span style="color:#B392F0;">isEmpty</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> arr[qmax.</span><span style="color:#B392F0;">peekLast</span><span style="color:#E1E4E8;">()] </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> arr[R]){</span></span>
<span class="line"><span style="color:#E1E4E8;">                qmax.</span><span style="color:#B392F0;">pollLast</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            qmax.</span><span style="color:#B392F0;">addLast</span><span style="color:#E1E4E8;">(R);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 如果窗口没有形成W的长度之前，不弹出数字</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(qmax.</span><span style="color:#B392F0;">peekFirst</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> R </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> w){</span></span>
<span class="line"><span style="color:#E1E4E8;">                qmax.</span><span style="color:#B392F0;">pollFirst</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 以上把窗口更新做完了</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 如果窗口没有形成W的长度之前，不收集头部的值</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(R </span><span style="color:#F97583;">&gt;=</span><span style="color:#E1E4E8;"> w</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">                res[index</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> arr[qmax.</span><span style="color:#B392F0;">peekFirst</span><span style="color:#E1E4E8;">()];</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> res;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SlidingWindowMaxArray</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;">[] </span><span style="color:#6F42C1;">getMaxWindow</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">arr</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#E36209;">w</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(arr </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> w </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> arr.length </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> w){</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 其中放的是位置，从大到小</span></span>
<span class="line"><span style="color:#24292E;">        LinkedList&lt;</span><span style="color:#D73A49;">Integer</span><span style="color:#24292E;">&gt; qmax </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;">  LinkedList&lt;</span><span style="color:#D73A49;">Integer</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">int</span><span style="color:#24292E;">[] res </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;">[arr.length </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> w </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> index </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> R </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; R </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> arr.length; R</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">while</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">qmax.</span><span style="color:#6F42C1;">isEmpty</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> arr[qmax.</span><span style="color:#6F42C1;">peekLast</span><span style="color:#24292E;">()] </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> arr[R]){</span></span>
<span class="line"><span style="color:#24292E;">                qmax.</span><span style="color:#6F42C1;">pollLast</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            qmax.</span><span style="color:#6F42C1;">addLast</span><span style="color:#24292E;">(R);</span></span>
<span class="line"><span style="color:#24292E;">            </span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 如果窗口没有形成W的长度之前，不弹出数字</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(qmax.</span><span style="color:#6F42C1;">peekFirst</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> R </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> w){</span></span>
<span class="line"><span style="color:#24292E;">                qmax.</span><span style="color:#6F42C1;">pollFirst</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 以上把窗口更新做完了</span></span>
<span class="line"><span style="color:#24292E;">            </span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 如果窗口没有形成W的长度之前，不收集头部的值</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(R </span><span style="color:#D73A49;">&gt;=</span><span style="color:#24292E;"> w</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">                res[index</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> arr[qmax.</span><span style="color:#6F42C1;">peekFirst</span><span style="color:#24292E;">()];</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> res;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="再举个-🌰" tabindex="-1">再举个 🌰 <a class="header-anchor" href="#再举个-🌰" aria-label="Permalink to &quot;再举个 🌰&quot;">​</a></h3><p>给定一个整形数组 arr，和一个整数 num。某个 arr 中的子数组 sub，如果想达标，必须满足：</p><p>sub 中最大值 - sub 中最小值 ≤ num，返回 arr 中达标子数组的数量。</p><p>思路：某个范围如果达标，缩小范围必达标；某个范围如果不达标，扩大范围必不达标。</p><p>假设 L 到 R 为达标数组，且 L...L&#39;...R&#39;...R，则 L&#39;...R&#39; 必为达标数组。</p><p>假设 L 到 R 为不达标数组，则 L 往左扩和 R 往右扩均为不达标数组。</p><p>利用两个双端队列，分别作出窗口内的最大值结构和最小值结构。</p><p>从 arr 的左边第一位开始往右扩，每扩一位，计算 max - min 是否 ≤ num，直到不达标的位置停，且不让该值进窗口，可以算出以 arr 第一位开始的子数组达标的数量。</p><p>接下来从 arr 的第二位开始往右扩，重复上面步骤，直到不达标的位置停，算出以 arr 第二位开始的子数组达标的数量。</p><p>即，求 0 开头的子数组数量，1 开头的子数组数量，...，复杂度为 O(n)</p>`,37),e=[o];function r(t,c,E,y,i,F){return n(),a("div",null,e)}const D=s(p,[["render",r]]);export{C as __pageData,D as default};