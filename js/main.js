'use strict';

// ヒーローエリアの上の空要素が見えなくなったらscrolledクラスを付けたい！

{
  function inViewCallback(entries, obs) {  /*設定した閾値を超えて表示されたり表示されなくなったりした全ての要素の情報を引数entriesで受け取る*/
    entries.forEach(entry =>{
      if (!entry.isIntersecting){
        return;
      }  /*entryが画面と交差したかを調べてfalseだった場合何もしない*/

      entry.target.classList.add('appear');  /*交差した要素（entry.target）にappearクラスをつける*/
      obs.unobserve(entry.target);  /*第二引数（obs）を使ってunobserveを実行（一回appearクラスをつけたらそれ以上その要素には何もしない）*/
    });
  }

  function onScrollCallback(entries){
    entries.forEach(entry => {
      if(!entry.isIntersecting){
        header.classList.add('scrolled');
        toTop.classList.add('scrolled');
      }else{
        header.classList.remove('scrolled');  /*スクロールで上に戻ったときにscrolledクラスを外す*/
        toTop.classList.remove('scrolled');
      }
    });
  }

  const header = document.querySelector('header');
  const toTop = document.getElementById('to_top');

  const inViewObserver = new IntersectionObserver(inViewCallback, {
    threshold: 0.2,
  });

  document.querySelectorAll('.animate').forEach(el => {
    inViewObserver.observe(el);
  });

  const onScrollObserver = new IntersectionObserver(onScrollCallback);
  onScrollObserver.observe(document.getElementById('target'));

  toTop.addEventListener('click', e => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}
