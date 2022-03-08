const contractAddress = '0x3FF54678459d70E2E28315D6de837560671305ff';
const deployedAddress = '0x28Fb7188c696BE99983Fa7bE8f974670EBB6b800';

const abi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_batch',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_semester',
        type: 'uint256',
      },
    ],
    name: 'addSemester',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getStudents',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'addr',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'rollNo',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'batch',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'semester',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'date',
            type: 'uint256',
          },
        ],
        internalType: 'struct Payment.Student[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_rollNo',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_batch',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_semester',
        type: 'uint256',
      },
    ],
    name: 'pay',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'semesters',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'start',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'batch',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'semester',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'students',
    outputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'rollNo',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'batch',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'semester',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'date',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

module.exports = {
  abi,
  contractAddress,
  deployedAddress
};
