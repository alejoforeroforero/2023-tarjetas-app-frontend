function tag(el, parentEl){
    const tag = document.createElement(el);
    parentEl.appendChild(tag);

    return tag;
}