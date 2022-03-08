const Web3 = require('web3');
const moment = require('moment');
const { abi, contractAddress, deployedAddress } = require('./payment');

// https://rinkeby.etherscan.io/address/0x3ff54678459d70e2e28315d6de837560671305ff#events
const getWeb3Info = async function () {
  const web3 = new Web3(Web3.givenProvider);
  const network = await web3.eth.net.getNetworkType();
  await window.ethereum.enable();

  const accounts = await web3.eth.getAccounts();
  const accountbalance = web3.utils.fromWei(
    await web3.eth.getBalance(accounts[0]),
    'ether'
  );

  const sliceAddress = function (addr) {
    return `${addr.slice(0, 5)}...${addr.slice(-4)}`;
  };

  document.getElementById('userAddress').innerHTML = `<div class='add'>
  <p>Connected address : <span class="address">${accounts[0]}</span></p>
  <p class="accountBalance">Account Balance: ${Number(accountbalance).toFixed(
    4
  )} ETH</p>
  </div>`;

  document.querySelector('.network').innerHTML = `<h3>${network}</h3>`;

  const payment = new web3.eth.Contract(abi, contractAddress);

  const contractbalance = web3.utils.fromWei(
    await web3.eth.getBalance(payment.options.address),
    'ether'
  );

  document.getElementById('contractAddress').innerHTML = `<div class='add'>
  <p>Contract address : <span class="address">${contractAddress}</span></p>
  <p class="accountBalance">Contract Balance : ${Number(
    contractbalance
  ).toFixed(4)} ETH</p>
  </div>`;

  const studentTableBody = document.querySelector('#studentTableBody');
  const getStudents = async function () {
    const students = await payment.methods.getStudents().call({
      from: accounts[0],
    });

    document.querySelector('#totalStds').innerHTML = students.length;

    for (let i = students.length - 1; i >= 0; i--) {
      const amount = web3.utils.fromWei(students[i].amount, 'ether');
      studentTableBody.innerHTML += `<tr class="student">
      <td>${students[i].name}</td>
      <td>${sliceAddress(students[i].addr)}</td>
      <td>${moment(new Date(students[i].date * 1000)).fromNow()} </td>
      <td>${students[i].rollNo}</td>
      <td>${students[i].semester}</td>
      <td>${students[i].batch}</td>
      <td>${amount} ETH</td>
   </tr>`;
    }
  };

  getStudents();

  const form = document.querySelector('#formSubmitFee');
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.forms['formSubmitFee']['name'].value;
    const rollNo = document.forms['formSubmitFee']['rollNo'].value;
    const batch = document.forms['formSubmitFee']['batch'].value;
    const semester = document.forms['formSubmitFee']['semester'].value;
    const amount = document.forms['formSubmitFee']['amount'].value;
    const transactionMessage = document.querySelector('.transactionMessage');

    transactionMessage.innerHTML = `Waiting for the Transaction to be approved by the network`;

    await payment.methods.pay(name, rollNo, batch, semester).send({
      from: accounts[0],
      value: web3.utils.toWei(amount, 'ether'),
    });

    studentTableBody.innerHTML = '';
    await getStudents();
    transactionMessage.innerHTML = `Transaction is entered into the network`;
  });

  const formAddSemester = document.querySelector('#formAddFee');

  formAddSemester.addEventListener('submit', async function (e) {
    e.preventDefault();

    const batch = document.forms['formAddFee']['batch'].value;
    const semester = document.forms['formAddFee']['semester'].value;
    const amount = document.forms['formAddFee']['amount'].value;
    console.log(amount);

    if (batch.length < 0 || semester.length < 0 || amount < 0) {
      return;
    }

    await payment.methods.addSemester(batch, semester).send({
      from: accounts[0],
      value: web3.utils.toWei(amount, 'ether'),
    });
  });

  // semesters

  const formShowSemesterDetails = document.querySelector(
    '#formShowSemesterDetails'
  );

  formShowSemesterDetails.addEventListener('submit', async function (e) {
    e.preventDefault();
    const batch =
      document.forms['formShowSemesterDetails']['batchSemester'].value;
    const semester =
      document.forms['formShowSemesterDetails']['semesterNo'].value;

  

    if (!batch || !semester) {
      return;
    }

    const semesterDetials = await payment.methods
      .semesters(batch, semester)
      .call({
        from: accounts[0],
      });
    ('');

    const {
      batch: batchSemester,
      semester: semesterNo,
      amount,
      start,
    } = semesterDetials;

    if (batchSemester == '' || semesterNo == 0) {
      document.querySelector(
        '#semesterDetials'
      ).innerHTML = `${batch} doesn't exist with ${semester}`;
      return;
    }

    document.querySelector('#semesterDetials').innerHTML = `<ul>
    <li>Amount: ${web3.utils.fromWei(amount, 'ether')} ETH</li>
    <li>Batch: ${batchSemester}</li>
    <li>Semester: ${semesterNo}</li>
    <li>Start: ${moment(new Date(start * 1000)).fromNow()}</li>
    </ul>`;
  });
};

window.addEventListener('load', function () {
  getWeb3Info();
});
