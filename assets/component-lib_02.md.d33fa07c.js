import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.6a4c7ee0.js";const p="/assets/image-1.e2eca703.png",u=JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"component-lib/02.md","filePath":"component-lib/02.md"}'),o={name:"component-lib/02.md"},e=l(`<div class="tip custom-block"><p class="custom-block-title">TIP</p><p>发布日期：<em>2023-08-20</em></p></div><p>作为一个基础组件库，样式是必不可少的。接下来我们来初始化一些样式文件的配置。</p><h2 id="一、配置默认样式" tabindex="-1">一、配置默认样式 <a class="header-anchor" href="#一、配置默认样式" aria-label="Permalink to &quot;一、配置默认样式&quot;">​</a></h2><p>我们参考 <a href="https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/reset.scss" target="_blank" rel="noreferrer">ElementPlus</a> 的默认样式，创建一个 <code>src/styles/reset.css</code> 文件，内容如下：</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">font-family</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">var</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">--au-font-family</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">font-weight</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">400</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">font-size</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">var</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">--au-font-size-base</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">var</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">--au-text-color-primary</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-webkit-font-smoothing</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">antialiased</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-moz-osx-font-smoothing</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">grayscale</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">-webkit-tap-highlight-color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">transparent</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">padding</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">margin</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">a</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">var</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">--au-color-primary</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">text-decoration</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">none</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  &amp;:hover,</span></span>
<span class="line"><span style="color:#E1E4E8;">  &amp;:focus {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">var</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">--au-color-primary-light-3</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  &amp;</span><span style="color:#B392F0;">:active</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">var</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">--au-color-primary-dark-2</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">h1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#85E89D;">h2</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#85E89D;">h3</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#85E89D;">h4</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#85E89D;">h5</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#85E89D;">h6</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">color</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">var</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">--au-text-color-regular</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">font-weight</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">inherit</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  &amp;:first-child {</span></span>
<span class="line"><span style="color:#E1E4E8;">    margin-top: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  &amp;</span><span style="color:#B392F0;">:last-child</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">margin-bottom</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">h1</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">font-size</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">calc</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">var</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">--au-font-size-base</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">6</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">h2</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">font-size</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">calc</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">var</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">--au-font-size-base</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">4</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">h3</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">font-size</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">calc</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">var</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">--au-font-size-base</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">h4</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#85E89D;">h5</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#85E89D;">h6</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">font-size</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">inherit</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">line-height</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1.8</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  &amp;:first-child {</span></span>
<span class="line"><span style="color:#E1E4E8;">    margin-top: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  &amp;</span><span style="color:#B392F0;">:last-child</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">margin-bottom</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">sup</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#85E89D;">sub</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">font-size</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">calc</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">var</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">--au-font-size-base</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">small</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">font-size</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">calc</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">var</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">--au-font-size-base</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">hr</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">margin-top</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">20</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">margin-bottom</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">20</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">border-top</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span><span style="color:#F97583;">px</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">solid</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">var</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">--au-border-color-lighter</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">body</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">font-family</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">var</span><span style="color:#24292E;">(</span><span style="color:#E36209;">--au-font-family</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">font-weight</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">400</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">font-size</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">var</span><span style="color:#24292E;">(</span><span style="color:#E36209;">--au-font-size-base</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">var</span><span style="color:#24292E;">(</span><span style="color:#E36209;">--au-text-color-primary</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-webkit-font-smoothing</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">antialiased</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-moz-osx-font-smoothing</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">grayscale</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">-webkit-tap-highlight-color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">transparent</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">padding</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">margin</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">a</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">var</span><span style="color:#24292E;">(</span><span style="color:#E36209;">--au-color-primary</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">text-decoration</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">none</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  &amp;:hover,</span></span>
<span class="line"><span style="color:#24292E;">  &amp;:focus {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">var</span><span style="color:#24292E;">(</span><span style="color:#E36209;">--au-color-primary-light-3</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  &amp;</span><span style="color:#6F42C1;">:active</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">var</span><span style="color:#24292E;">(</span><span style="color:#E36209;">--au-color-primary-dark-2</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">h1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#22863A;">h2</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#22863A;">h3</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#22863A;">h4</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#22863A;">h5</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#22863A;">h6</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">color</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">var</span><span style="color:#24292E;">(</span><span style="color:#E36209;">--au-text-color-regular</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">font-weight</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">inherit</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  &amp;:first-child {</span></span>
<span class="line"><span style="color:#24292E;">    margin-top: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  &amp;</span><span style="color:#6F42C1;">:last-child</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">margin-bottom</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">h1</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">font-size</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">calc</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">var</span><span style="color:#24292E;">(</span><span style="color:#E36209;">--au-font-size-base</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">6</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">h2</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">font-size</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">calc</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">var</span><span style="color:#24292E;">(</span><span style="color:#E36209;">--au-font-size-base</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">4</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">h3</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">font-size</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">calc</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">var</span><span style="color:#24292E;">(</span><span style="color:#E36209;">--au-font-size-base</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">h4</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#22863A;">h5</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#22863A;">h6</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#22863A;">p</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">font-size</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">inherit</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">p</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">line-height</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1.8</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  &amp;:first-child {</span></span>
<span class="line"><span style="color:#24292E;">    margin-top: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  &amp;</span><span style="color:#6F42C1;">:last-child</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">margin-bottom</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">sup</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#22863A;">sub</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">font-size</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">calc</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">var</span><span style="color:#24292E;">(</span><span style="color:#E36209;">--au-font-size-base</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">small</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">font-size</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">calc</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">var</span><span style="color:#24292E;">(</span><span style="color:#E36209;">--au-font-size-base</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">hr</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">margin-top</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">20</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">margin-bottom</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">20</span><span style="color:#D73A49;">px</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">border-top</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span><span style="color:#D73A49;">px</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">solid</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">var</span><span style="color:#24292E;">(</span><span style="color:#E36209;">--au-border-color-lighter</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="二、系统级色彩和样式变量" tabindex="-1">二、系统级色彩和样式变量 <a class="header-anchor" href="#二、系统级色彩和样式变量" aria-label="Permalink to &quot;二、系统级色彩和样式变量&quot;">​</a></h2><p>组件库一般都会有一套自己的色彩体系，比如 <a href="https://element-plus.org/en-US/component/color.html#main-color" target="_blank" rel="noreferrer">ElementPlus 色彩体系</a>，以及更丰富的 <a href="https://ant.design/docs/spec/colors-cn" target="_blank" rel="noreferrer">Ant Design 色彩体系</a>，如下图，</p><p><img src="`+p+`" alt="色彩体系"></p><p>其他的可参考：</p><ul><li><a href="https://tailwindcss.com/docs/customizing-colors" target="_blank" rel="noreferrer">Tailwind.css</a></li><li><a href="https://getbootstrap.com/docs/5.3/customize/color" target="_blank" rel="noreferrer">Bootstrap</a></li></ul><p>基础组件改变样式，通常我们会定义一些样式变量，然后动态地赋予组件对应的 <code>class</code>。一般包含 <code>color</code>、<code>border</code>、<code>font</code> 等样式相关的属性，我们同时也定义一些组件库常见的样式变量，比如禁用样式 <code>disabled</code> 以及组件动画效果 <code>animation</code>。</p><p>确定了需要哪些样式变量，接下来我们定义一套色彩体系，初始化一些样式变量。创建一个 <code>src/styles/vars.css</code> 文件，内容如下：</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">:root</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/* colors */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">--au-color-white</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">#ffffff</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">--au-color-black</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">#000000</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">--colors</span><span style="color:#E1E4E8;">: (</span></span>
<span class="line"><span style="color:#E1E4E8;">    primary: </span><span style="color:#79B8FF;">#0958d9</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    success: </span><span style="color:#79B8FF;">#389e0d</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    warning: </span><span style="color:#79B8FF;">#d4b106</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    danger: </span><span style="color:#79B8FF;">#d4380d</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    info: </span><span style="color:#79B8FF;">#909399</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  @</span><span style="color:#79B8FF;">each</span><span style="color:#E1E4E8;"> $</span><span style="color:#79B8FF;">val</span><span style="color:#E1E4E8;">, $</span><span style="color:#79B8FF;">color</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">in</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">var</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">--colors</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FFAB70;">--au-color-</span><span style="color:#E1E4E8;">$(</span><span style="color:#79B8FF;">val</span><span style="color:#E1E4E8;">): $(</span><span style="color:#79B8FF;">color</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#79B8FF;">for</span><span style="color:#E1E4E8;"> $</span><span style="color:#79B8FF;">i</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">from</span><span style="color:#E1E4E8;"> 3 </span><span style="color:#79B8FF;">to</span><span style="color:#E1E4E8;"> 9 </span><span style="color:#79B8FF;">by</span><span style="color:#E1E4E8;"> 2 {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#FFAB70;">--au-color-</span><span style="color:#E1E4E8;">$(</span><span style="color:#79B8FF;">val</span><span style="color:#E1E4E8;">)</span><span style="color:#79B8FF;">-light-</span><span style="color:#E1E4E8;">$(</span><span style="color:#79B8FF;">i</span><span style="color:#E1E4E8;">): mix(</span><span style="color:#79B8FF;">#fff</span><span style="color:#E1E4E8;">, $(</span><span style="color:#79B8FF;">color</span><span style="color:#E1E4E8;">), .$(</span><span style="color:#79B8FF;">i</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    --au-color-$(val)-light-8: mix(</span><span style="color:#B392F0;">#fff</span><span style="color:#E1E4E8;">, $(color), </span><span style="color:#FDAEB7;font-style:italic;">.8</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    --au-color-$(val)-dark-2: mix(</span><span style="color:#FDAEB7;font-style:italic;">#000</span><span style="color:#E1E4E8;">, $(color), </span><span style="color:#FDAEB7;font-style:italic;">.2</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  --au-bg-color: </span><span style="color:#FDAEB7;font-style:italic;">#ffffff;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-bg-color-page: </span><span style="color:#FDAEB7;font-style:italic;">#f2f3f5;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-bg-color-overlay: </span><span style="color:#FDAEB7;font-style:italic;">#ffffff;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-text-color-primary: </span><span style="color:#FDAEB7;font-style:italic;">#303133</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-text-color-regular: </span><span style="color:#FDAEB7;font-style:italic;">#606266</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-text-color-secondary: </span><span style="color:#FDAEB7;font-style:italic;">#909399</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-text-color-placeholder: </span><span style="color:#FDAEB7;font-style:italic;">#a8abb2;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-text-color-disabled: </span><span style="color:#FDAEB7;font-style:italic;">#c0c4cc;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-border-color: </span><span style="color:#FDAEB7;font-style:italic;">#dcdfe6;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-border-color-light: </span><span style="color:#FDAEB7;font-style:italic;">#e4e7ed;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-border-color-lighter: </span><span style="color:#FDAEB7;font-style:italic;">#ebeef5;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-border-color-extra-light: </span><span style="color:#FDAEB7;font-style:italic;">#f2f6fc;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-border-color-dark: </span><span style="color:#FDAEB7;font-style:italic;">#d4d7de;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-border-color-darker: </span><span style="color:#FDAEB7;font-style:italic;">#cdd0d6;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-fill-color: </span><span style="color:#FDAEB7;font-style:italic;">#f0f2f5;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-fill-color-light: </span><span style="color:#FDAEB7;font-style:italic;">#f5f7fa;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-fill-color-lighter: </span><span style="color:#FDAEB7;font-style:italic;">#fafafa;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-fill-color-extra-light: </span><span style="color:#FDAEB7;font-style:italic;">#fafcff;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-fill-color-dark: </span><span style="color:#FDAEB7;font-style:italic;">#ebedf0;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-fill-color-darker: </span><span style="color:#FDAEB7;font-style:italic;">#e6e8eb;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-fill-color-blank: </span><span style="color:#FDAEB7;font-style:italic;">#ffffff;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/* border */</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-border-width: 1px;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-border-style: solid;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-border-color-hover: var(--au-text-color-disabled);</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-border: var(--au-border-width) var(--au-border-style) var(--au-border-color);</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-border-radius-base: 4px;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-border-radius-small: 2px;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-border-radius-round: 20px;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-border-radius-circle: 100%;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/*font*/</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-font-size-extra-large: 20px;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-font-size-large: 18px;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-font-size-medium: 16px;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-font-size-base: 14px;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-font-size-small: 13px;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-font-size-extra-small: 12px;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;</span><span style="color:#79B8FF;">\\5fae\\8f6f\\96c5\\9ed1</span><span style="color:#E1E4E8;">&quot;, Arial, </span><span style="color:#85E89D;">sans-serif</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-font-weight-primary: 500;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/*disabled*/</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-disabled-bg-color: var(--au-fill-color-light);</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-disabled-text-color: var(--au-text-color-placeholder);</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-disabled-border-color: var(--au-border-color-light);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/*animation*/</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-transition-duration: </span><span style="color:#FDAEB7;font-style:italic;">.3s</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-transition-duration-fast: </span><span style="color:#FDAEB7;font-style:italic;">.2s</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  --au-box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, </span><span style="color:#FDAEB7;font-style:italic;">.04</span><span style="color:#E1E4E8;">), 0px 8px 20px rgba(0, 0, 0, </span><span style="color:#FDAEB7;font-style:italic;">.08</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-box-shadow-light: 0px 0px 12px rgba(0, 0, 0, </span><span style="color:#FDAEB7;font-style:italic;">.12</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-box-shadow-lighter: 0px 0px 6px rgba(0, 0, 0, </span><span style="color:#FDAEB7;font-style:italic;">.12</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  --au-box-shadow-dark: 0px 16px 48px 16px rgba(0, 0, 0, </span><span style="color:#FDAEB7;font-style:italic;">.08</span><span style="color:#E1E4E8;">), 0px 12px 32px rgba(0, 0, 0, </span><span style="color:#FDAEB7;font-style:italic;">.12</span><span style="color:#E1E4E8;">), 0px 8px 16px -8px rgba(0, 0, 0, </span><span style="color:#FDAEB7;font-style:italic;">.16</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">:root</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/* colors */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">--au-color-white</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">#ffffff</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">--au-color-black</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">#000000</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">--colors</span><span style="color:#24292E;">: (</span></span>
<span class="line"><span style="color:#24292E;">    primary: </span><span style="color:#005CC5;">#0958d9</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    success: </span><span style="color:#005CC5;">#389e0d</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    warning: </span><span style="color:#005CC5;">#d4b106</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    danger: </span><span style="color:#005CC5;">#d4380d</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    info: </span><span style="color:#005CC5;">#909399</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  @</span><span style="color:#005CC5;">each</span><span style="color:#24292E;"> $</span><span style="color:#005CC5;">val</span><span style="color:#24292E;">, $</span><span style="color:#005CC5;">color</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">in</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">var</span><span style="color:#24292E;">(</span><span style="color:#E36209;">--colors</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">--au-color-</span><span style="color:#24292E;">$(</span><span style="color:#005CC5;">val</span><span style="color:#24292E;">): $(</span><span style="color:#005CC5;">color</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#005CC5;">for</span><span style="color:#24292E;"> $</span><span style="color:#005CC5;">i</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">from</span><span style="color:#24292E;"> 3 </span><span style="color:#005CC5;">to</span><span style="color:#24292E;"> 9 </span><span style="color:#005CC5;">by</span><span style="color:#24292E;"> 2 {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#E36209;">--au-color-</span><span style="color:#24292E;">$(</span><span style="color:#005CC5;">val</span><span style="color:#24292E;">)</span><span style="color:#005CC5;">-light-</span><span style="color:#24292E;">$(</span><span style="color:#005CC5;">i</span><span style="color:#24292E;">): mix(</span><span style="color:#005CC5;">#fff</span><span style="color:#24292E;">, $(</span><span style="color:#005CC5;">color</span><span style="color:#24292E;">), .$(</span><span style="color:#005CC5;">i</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    --au-color-$(val)-light-8: mix(</span><span style="color:#6F42C1;">#fff</span><span style="color:#24292E;">, $(color), </span><span style="color:#B31D28;font-style:italic;">.8</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    --au-color-$(val)-dark-2: mix(</span><span style="color:#B31D28;font-style:italic;">#000</span><span style="color:#24292E;">, $(color), </span><span style="color:#B31D28;font-style:italic;">.2</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  --au-bg-color: </span><span style="color:#B31D28;font-style:italic;">#ffffff;</span></span>
<span class="line"><span style="color:#24292E;">  --au-bg-color-page: </span><span style="color:#B31D28;font-style:italic;">#f2f3f5;</span></span>
<span class="line"><span style="color:#24292E;">  --au-bg-color-overlay: </span><span style="color:#B31D28;font-style:italic;">#ffffff;</span></span>
<span class="line"><span style="color:#24292E;">  --au-text-color-primary: </span><span style="color:#B31D28;font-style:italic;">#303133</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  --au-text-color-regular: </span><span style="color:#B31D28;font-style:italic;">#606266</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  --au-text-color-secondary: </span><span style="color:#B31D28;font-style:italic;">#909399</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  --au-text-color-placeholder: </span><span style="color:#B31D28;font-style:italic;">#a8abb2;</span></span>
<span class="line"><span style="color:#24292E;">  --au-text-color-disabled: </span><span style="color:#B31D28;font-style:italic;">#c0c4cc;</span></span>
<span class="line"><span style="color:#24292E;">  --au-border-color: </span><span style="color:#B31D28;font-style:italic;">#dcdfe6;</span></span>
<span class="line"><span style="color:#24292E;">  --au-border-color-light: </span><span style="color:#B31D28;font-style:italic;">#e4e7ed;</span></span>
<span class="line"><span style="color:#24292E;">  --au-border-color-lighter: </span><span style="color:#B31D28;font-style:italic;">#ebeef5;</span></span>
<span class="line"><span style="color:#24292E;">  --au-border-color-extra-light: </span><span style="color:#B31D28;font-style:italic;">#f2f6fc;</span></span>
<span class="line"><span style="color:#24292E;">  --au-border-color-dark: </span><span style="color:#B31D28;font-style:italic;">#d4d7de;</span></span>
<span class="line"><span style="color:#24292E;">  --au-border-color-darker: </span><span style="color:#B31D28;font-style:italic;">#cdd0d6;</span></span>
<span class="line"><span style="color:#24292E;">  --au-fill-color: </span><span style="color:#B31D28;font-style:italic;">#f0f2f5;</span></span>
<span class="line"><span style="color:#24292E;">  --au-fill-color-light: </span><span style="color:#B31D28;font-style:italic;">#f5f7fa;</span></span>
<span class="line"><span style="color:#24292E;">  --au-fill-color-lighter: </span><span style="color:#B31D28;font-style:italic;">#fafafa;</span></span>
<span class="line"><span style="color:#24292E;">  --au-fill-color-extra-light: </span><span style="color:#B31D28;font-style:italic;">#fafcff;</span></span>
<span class="line"><span style="color:#24292E;">  --au-fill-color-dark: </span><span style="color:#B31D28;font-style:italic;">#ebedf0;</span></span>
<span class="line"><span style="color:#24292E;">  --au-fill-color-darker: </span><span style="color:#B31D28;font-style:italic;">#e6e8eb;</span></span>
<span class="line"><span style="color:#24292E;">  --au-fill-color-blank: </span><span style="color:#B31D28;font-style:italic;">#ffffff;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/* border */</span></span>
<span class="line"><span style="color:#24292E;">  --au-border-width: 1px;</span></span>
<span class="line"><span style="color:#24292E;">  --au-border-style: solid;</span></span>
<span class="line"><span style="color:#24292E;">  --au-border-color-hover: var(--au-text-color-disabled);</span></span>
<span class="line"><span style="color:#24292E;">  --au-border: var(--au-border-width) var(--au-border-style) var(--au-border-color);</span></span>
<span class="line"><span style="color:#24292E;">  --au-border-radius-base: 4px;</span></span>
<span class="line"><span style="color:#24292E;">  --au-border-radius-small: 2px;</span></span>
<span class="line"><span style="color:#24292E;">  --au-border-radius-round: 20px;</span></span>
<span class="line"><span style="color:#24292E;">  --au-border-radius-circle: 100%;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/*font*/</span></span>
<span class="line"><span style="color:#24292E;">  --au-font-size-extra-large: 20px;</span></span>
<span class="line"><span style="color:#24292E;">  --au-font-size-large: 18px;</span></span>
<span class="line"><span style="color:#24292E;">  --au-font-size-medium: 16px;</span></span>
<span class="line"><span style="color:#24292E;">  --au-font-size-base: 14px;</span></span>
<span class="line"><span style="color:#24292E;">  --au-font-size-small: 13px;</span></span>
<span class="line"><span style="color:#24292E;">  --au-font-size-extra-small: 12px;</span></span>
<span class="line"><span style="color:#24292E;">  --au-font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;</span><span style="color:#005CC5;">\\5fae\\8f6f\\96c5\\9ed1</span><span style="color:#24292E;">&quot;, Arial, </span><span style="color:#22863A;">sans-serif</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  --au-font-weight-primary: 500;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/*disabled*/</span></span>
<span class="line"><span style="color:#24292E;">  --au-disabled-bg-color: var(--au-fill-color-light);</span></span>
<span class="line"><span style="color:#24292E;">  --au-disabled-text-color: var(--au-text-color-placeholder);</span></span>
<span class="line"><span style="color:#24292E;">  --au-disabled-border-color: var(--au-border-color-light);</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/*animation*/</span></span>
<span class="line"><span style="color:#24292E;">  --au-transition-duration: </span><span style="color:#B31D28;font-style:italic;">.3s</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  --au-transition-duration-fast: </span><span style="color:#B31D28;font-style:italic;">.2s</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  --au-box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, </span><span style="color:#B31D28;font-style:italic;">.04</span><span style="color:#24292E;">), 0px 8px 20px rgba(0, 0, 0, </span><span style="color:#B31D28;font-style:italic;">.08</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  --au-box-shadow-light: 0px 0px 12px rgba(0, 0, 0, </span><span style="color:#B31D28;font-style:italic;">.12</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  --au-box-shadow-lighter: 0px 0px 6px rgba(0, 0, 0, </span><span style="color:#B31D28;font-style:italic;">.12</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  --au-box-shadow-dark: 0px 16px 48px 16px rgba(0, 0, 0, </span><span style="color:#B31D28;font-style:italic;">.08</span><span style="color:#24292E;">), 0px 12px 32px rgba(0, 0, 0, </span><span style="color:#B31D28;font-style:italic;">.12</span><span style="color:#24292E;">), 0px 8px 16px -8px rgba(0, 0, 0, </span><span style="color:#B31D28;font-style:italic;">.16</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>然后将样式统一导出， <code>src/styles/index.css</code> 如下：</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">@import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./reset.css&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">@import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./vars.css&#39;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">@import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./reset.css&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">@import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./vars.css&#39;</span><span style="color:#24292E;">;</span></span></code></pre></div>`,15),c=[e];function t(r,E,y,i,F,f){return a(),n("div",null,c)}const C=s(o,[["render",t]]);export{u as __pageData,C as default};
