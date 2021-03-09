window.jQuery=function(selectorOrArray){
    let elements
    if(typeof selectorOrArray==='string'){
        elements=document.querySelectorAll(selectorOrArray)
    }else if(selectorOrArray instanceof Array){
        elements=selectorOrArray
    }
    //api 可以控制selector的所有对象(也就是elements)
    return {
        find(selector){
            let array=[]
            for(let i=0;i<elements.length;i++){
                const elements2=Array.from(elements[i].querySelectorAll(selector))
                array=array.concat(elements2)
            }
            array.oldApi=this//需要加强理解
            return jQuery(array)
        },
        //闭包，这里的函数还是调用了jQuery的elements
        addClass(className){
            for(let i=0;i<elements.length;i++){
                const element=elements[i]
                element.classList.add(className)//闭包
            }
            return this
        },
        each(fn){
            for(let i=0;i<elements.length;i++){
                fn.call(null,elements[i],i)
            }
            return this
        },
        parent(){
            const array=[]
            this.each((node)=>{
                if(array.indexOf(node.parentNode)===-1){
                    array.push(node.parentNode)
                }
            })
            return jQuery(array)
        },
        children(){
            const array=[]
            this.each((node)=>{
                if(array.indexOf(node.childrenNode)===-1){
                    array.push(...node.children)
                }
            })
            return jQuery(array)
        },
        print(){
            console.log(elements)
        },



        oldApi: selectorOrArray.oldApi,
        end(){
            return this.oldApi
        },       
    }
}
