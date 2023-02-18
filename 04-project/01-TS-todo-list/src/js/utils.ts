export function create(tagName:string, className:string, html:string):HTMLElement{
    const oItem = document.createElement(tagName)
    oItem.className = className
    oItem.innerHTML = html

    return oItem
}

export function findParentNode(target:HTMLElement, className:string):HTMLElement | undefined{
    while(target = target.parentNode as HTMLElement){
        if(target.className === className){
            return target
        }
    }
}