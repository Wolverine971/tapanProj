

export function animExpandPanel(rootElement: HTMLElement, selector: string, expand: boolean) {
  let ele = rootElement.querySelector(selector+' > *:first-child');
  if (ele) {
    //height of drawer
    if (expand) {
      let heightOfHidden = ele.getBoundingClientRect().height;
      let border = window.getComputedStyle(ele);
      ele.parentElement.style.height = heightOfHidden + 'px';
    } else {
      ele.parentElement.style.height = '0px';
    }
  }
}

export function animOnResize(rootElement: HTMLElement, selector: string, expand: boolean) {
  if (expand) {
    let ele = rootElement.querySelector(selector+' > *:first-child');
    if (ele) {
      let heightOfHidden = ele.getBoundingClientRect().height;
      ele.parentElement.style.height = heightOfHidden + 'px';
    }
  }
}