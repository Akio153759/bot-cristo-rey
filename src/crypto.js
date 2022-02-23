const axios = require('axios').default;
const fs = require('fs');
require('dotenv').config();

const getSLPPrice = async () => {
    try {
        const response = await axios.get(process.env.URL_SLP_PRICE_API);

        if (response.status === 200 && response.data)
            return response.data[0].current_price;
        else
            return null;
    } catch (e) {
        console.error(`An error ocurred calling SLP PRICE API: ${e}`);
    }
}

const writeLastSLPPrice = (lastPrice) => {
    const content = `{"lastPrice": "${lastPrice}"}`;
    try {
      fs.writeFileSync('./anotations.json', content, { flag: 'w+'});
    } catch (e) {
      console.error(`An error ocurred writing slp price: ${err}`)
    }
}

const readLastSLPPrice = () => {
  try {
    const data = fs.readFileSync('./anotations.json', 'utf8');
    return JSON.parse(data);
  } catch (e) {
    console.error(`An error ocurred reading slp price: ${e}`);
    return null;
  }
  
}

module.exports = {
  getSLPPrice,
  readLastSLPPrice,
  writeLastSLPPrice,
}