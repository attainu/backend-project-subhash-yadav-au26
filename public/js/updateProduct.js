
$("#update-user").submit(function(event){
event.preventDefault()
var unindexed_array = $("#update-user").serializeArray()
let data ={};
// store data in one object
$.map(unindexed_array,function(n,i){
    data[n['name']] = n['value']
})

console.log(data)
const QueryString = window.location.href;
let url = new URL(QueryString)
let search = url.searchParams
let valueSearch = search.get('id')
let U =`${window.location.origin}/api/v1/admin/product/${valueSearch}`
let route =`${window.location.origin}/api/v1/admin/product/${valueSearch}`
console.log(route)

let request ={
    'url':U,
    'method':'put',
    'data':data
}

$.ajax(request).done(function(){
    alert("product updated successfully")
    location.reload()
})

})