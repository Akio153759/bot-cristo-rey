const crypto = require('./crypto');

const checkSlpPriceTask = async (client) => {
  const currentPrice = await crypto.getSLPPrice();

  if (currentPrice) {
    const data = crypto.readLastSLPPrice();
    if (data != null) {
      if (data.lastPrice) {
        const percent = currentPrice * 100 / data.lastPrice - 100;
        const channels = process.env.DISCORD_CHANNEL_ID.split(',');
      
        let message = '';

        if (percent > 0)
          message = `El SLP subió un ${percent.toFixed(2)}%. Vale USD ${currentPrice.toFixed(5)}`;
        else
          message = `El SLP bajó un ${percent.toFixed(2)}%. Vale USD ${currentPrice.toFixed(5)}`;

        channels.forEach(chn => {
          const channel = client.channels.cache.find(channel => channel.id === chn)
          channel.send(message)
        });

      } else {
        console.log('Not lastPrice.', data.lastPrice);
      }
      
    } else {
      console.log(`Data is null`);
    }

    crypto.writeLastSLPPrice(currentPrice);
    
  } else {
    console.log(`Not value for currentPrice: ${currentPrice}`);
  }
}

module.exports = {
  checkSlpPriceTask,
}
