const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config()

// Load environment variables from .env file
const BOT_TOKEN = process.env.TOKEN;

// API endpoint for fetching student data
const API_URL = process.env.URL; // Replace with your actual API link

const customMessage = `


🚀 Developer : Satyam Prajapati  
🤖 Co-developer and  Inspired by : Swayam Shah

📢 Notice:  
- Data is based on Semester 2.  
- Roll numbers may change; however, ID and Name are valid.  
- Please confirm the roll number before taking any action.
`;

// Create a new bot instance
function main() {


const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Start command handler
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Welcome to Bot! Send me a student roll number to get their data."
  );
});

// about command 
bot.onText(/\/about/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    customMessage
  );
});

bot.onText(/\/contact/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    'https://wa.me/918511477882  (Satyam)'
  );
});
bot.onText(/\/info/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    'This is bot based on student roll number (DHARMSINH DESAI UNIVERSITY Private university in Nadiad, Gujarat)'
  );
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    'Just send me roll number of student, i will provide their details'
  );
});
// Function to fetch student data from API using fetch
async function fetchStudentData(rollNumber) {
  try {
    const response = await fetch(`${API_URL}/${rollNumber}`);

    if (response.ok) {
      const studentData = await response.json();
      console.log("request hit for rollNumber :" , rollNumber);
      
      return studentData;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    return null;
  }
}

// Message handler for roll numbers
bot.on('message', async (msg) => {
  const rollNumber = msg.text.trim();

  if (msg.text.startsWith('/')) return;

  if (!isNaN(rollNumber)) {
    const student = await fetchStudentData(rollNumber);
    // const customMessage = '\n Api developer Satyam prajapati , \n Bot developer Swayam Shah \n Notice : data based on semester 2, rollNumber may be change, id and name are valid , confirm roll number before taking any action' 


// const customMessage = `
// 📢 *IMPORTANT NOTICE* 📢

// 🔹 **API Developer**: Satyam Prajapati  
// 🔹 **Bot Developer**: Swayam Shah  

// ⚠️ *Data is based on Semester 2*  
// ⚠️ *Roll numbers may change*, but **ID and Name are valid**.  

// ❗ **Please confirm the roll number** before taking any action.
// `;

// console.log(noticeMessage);

    if (student) {
      const response = `Roll Number: ${student.rollnumber}\nName: ${student.name}\nID: ${student.id}`;
      bot.sendMessage(msg.chat.id, response);
    } else {
      bot.sendMessage(msg.chat.id, `No data found for Roll Number: ${rollNumber}`);
    }
  } else {
    bot.sendMessage(msg.chat.id, 'Please send a valid roll number.');
  }
});
}

module.exports = main
