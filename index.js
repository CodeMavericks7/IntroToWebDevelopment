$('#search').click(function () {
    event.preventDefault();
    const year = $('#year').val();
    const month = $('#month').val();

    if(year && month){
        fetch(`http://localhost:3000/class/${year}/${month}/search`, {
					method: 'GET',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
					}
				})
					.then(response => response.json())
					.then(response => console.log(JSON.stringify(response)))
    }
})