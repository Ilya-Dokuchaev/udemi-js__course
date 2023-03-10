/*
function SeriesSum(n)
{
    // Happy Coding ^_^
    let sum =0 ,divider =0
    if (n>0){
        for (let i=0;i<n;i++){
            if(i===0){divider=1}else{
            divider = 1/(1+i*3)
            }
                sum+=divider
        }
        return sum.toFixed(2)
    }return (0).toFixed(2)
}

console.log(SeriesSum(0))*/

// complete the function
function solution(string) {
    let output = string.replace(/([A-Z])/g,' $1')
    return output[0] + output.substring(1).toLowerCase()
}

console.log(solution('camelCase'))
