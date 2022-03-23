const allPhones = () => {
      document.getElementById('phone-image').innerHTML ="";
      document.getElementById('phone-detail-text').innerHTML="";
      const mainDiv = document.getElementById('main').innerHTML="";
      const searchValue = document.getElementById('input-value').value;
      // console.log(searchValue);
      const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
      fetch(url)
      .then(res =>res.json())
      .then(data => showAllPhone(data.data))
      document.getElementById('input-value').value=''
      
}
const showAllPhone = (phones) =>{
      // console.log(phones);
      const mainDiv = document.getElementById('main');
      for (const phone of phones) {
            // console.log(phone.phone_name);
            const div = document.createElement('div');
            div.classList.add('col-md-4');
            div.classList.add('col-sm-12')
            div.classList.add('mb-4')
            div.innerHTML=`
            <div class="card"">
                  <img src="${phone.image}" class="card-img-top" alt="...">
                  <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <h6 class="card-title">${phone.brand}</h6>
                        <a onclick="showPhoneDetail('${phone.slug}')" href="#" class="btn btn-primary">Explore</a>
                  </div>
            </div>
            `;
            mainDiv.appendChild(div);
      }
}

const showPhoneDetail = (phoneInfo) =>{
      const slug = phoneInfo;
      // console.log(slug)
      const url = `https://openapi.programming-hero.com/api/phone/${slug}`
      fetch(url)
      .then(res =>res.json())
      .then(data => displayPhoneDetail(data))

}

const displayPhoneDetail = phoneDetail =>{
      // console.log(phoneDetail.data);
      document.getElementById('phone-image').innerHTML ="";
      document.getElementById('phone-detail-text').innerHTML="";

      const phoneInfo = phoneDetail.data;
      const otherInfo = phoneInfo.others;
      const sensorInfo = phoneInfo.mainFeatures.sensors;
      // console.log(sensorInfo);
      const phoneImageDiv = document.getElementById('phone-image');
      const phoneDetailText = document.getElementById('phone-detail-text');
      phoneImageDiv.innerHTML=`
            <div class="card">
                  <img src="${phoneInfo.image}" class="card-img-top" alt="...">
            </div>
            `;
      const div = document.createElement('div')
      div.innerHTML = `
      <h3>${phoneInfo.name}</h3>
      <h4>Brand : ${phoneInfo.brand}</h4>
      <p>Storage : ${phoneInfo.mainFeatures.storage}</p>
      <p>Chipset : ${phoneInfo.mainFeatures.chipSet}</p>
      <p>Display Size: ${phoneInfo.mainFeatures.displaySize}</p>
      <p>Memory : ${phoneInfo.mainFeatures.memory}</p>
      <div id="sensor" class="fw-bold">Sensors:</div>
      <div id="others" class="fw-bold">Others:</div>
      `;
      phoneDetailText.appendChild(div);
      getSensors(sensorInfo);
      getOthers(otherInfo)
}

const getOthers = otherInfo =>{
      // console.log(otherInfo)
      const div = document.createElement('div')
      for (const other in otherInfo) {
            const p = document.createElement('p');
            p.classList.add('fw-normal');
            p.innerHTML = `
                  <span>${other}</span> : <span>${otherInfo[other]}</span>
            `;
            div.appendChild(p);
      }
      document.getElementById('others').appendChild(div);
      
}

const getSensors = sensorInfo =>{
     
      // console.log(sensorInfo);
      const div = document.createElement('div');
      div.classList.add('d-flex')
    
      for (const sensor of sensorInfo) {
            const p = document.createElement('p');
            p.classList.add('fw-normal')
            p.innerHTML = `
            <span class="space">${sensor},</span> 
            `;
            div.appendChild(p);
      }
      document.getElementById('sensor').appendChild(div)
} 
