
document.querySelector('#createprofile').addEventListener('submit', (e) => {
    e.preventDefault()
    
    fetch('/api/projects', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'

        },
        body:JSON.stringify({
            needed_funding,name,description
        })

    }).then((res) =>{
        return res.json()

    }).then((data) =>{
        console.log(data)
        window.location.replace('/profile')
    })
});
document.querySelector('button').addEventListener('click',(event)=>{
    e.preventDefault()
    console.log(e.target.id)
    fetch('/api/projects'+ e.target.id, {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json'

        },
    }).then((res) =>{
        return res.json()

    }).then((data) =>{
        console.log(data)
        window.location.replace('/profile')
        })
})