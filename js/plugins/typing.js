(()=>{
  // 获取页面中第一个具有 class 名为 "trm-typed-text" 的元素
  var I = document.querySelector(".trm-typed-text"),
      // 获取预定义的文字数组
      u = window.ASYNC_CONFIG.typed_text || [];

  // 定义打字动画的主要函数 y
  function y(i, e) {
    // 如果元素不存在或文字数组无效，则返回
    if (!i || !Array.isArray(e) || (Array.isArray(e) && !e.length)) return;

    // 定义动画的时间参数
    let T = 100,  // 每次字符更新的时间间隔（毫秒）
        A = 3000, // 显示完整句子的时间间隔（毫秒）
        o = 0,    // 表示打字模式
        c = 1,    // 表示删除模式
        n = o,    // 当前模式，初始为打字模式
        r = 0,    // 当前文字数组的索引
        t = 0,    // 当前显示的字符数
        s;        // 定时器变量

    // 启动打字效果的主要定时器函数
    l();

    // 定时器函数 l，设置定时器以调用字符更新函数
    function l() {
      s = setInterval(a, T);
    }

    // 字符更新函数 a，根据当前模式打字或直接删除字符
    function a() {
      let d = e[r];
      if (n == o) { // 打字模式
        t++;
        if (t == d.length) { // 完成打字后切换为删除模式
          n = c;
          clearInterval(s);
          setTimeout(l, A); // 延时后重新启动定时器
        }
      } else if (n == c) { // 删除模式
        i.textContent = ""; // 直接清空文字
        f(); // 切换到下一句
      }
      let p = d.substring(0, t);
      i.textContent = p;
    }

    // 切换到下一句并重新启动打字模式
    function f() {
      t = 0;
      n = o;
      r++;
      if (r == e.length) r = 0; // 循环到第一个句子
    }
  }

  // 启动打字动画
  y(I, u);

  // 监听 swup:contentReplaced 事件，以便在页面内容替换后重新启动打字动画
  window.ASYNC_CONFIG.swup && document.addEventListener("swup:contentReplaced", function() {
    y(document.querySelector(".trm-typed-text"), u);
  });
})();
