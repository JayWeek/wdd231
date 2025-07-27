const getMyInfo = new URLSearchParams(window.location.search);
    // getMyInfo.set('first', "Stacy");
    // getMyInfo.delete('phone');

document.querySelector('#results').innerHTML = `
    <p>Appointment for ${getMyInfo.get('first')} ${getMyInfo.get('last')}</p>
    <p>Proxy ${getMyInfo.get('ordinance')} on ${getMyInfo.get('date')} in the ${getMyInfo.get('location')}</p>
    <p>Your phone: ${getMyInfo.get('phone')}</p>
`