import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Input } from '@material-tailwind/react';
import { FaCheck, FaCreditCard, FaUser } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const fee_id = window.location.pathname.split('/').pop();

export default function ViewFee() {
  let navigate = useNavigate();

  const [fee, setFee] = useState(null);
  const [student, setStudent] = useState({});
  const [installment, setInstallment] = useState(0);
  const [installmentFee, setInstallmentFee] = useState(fee?.min_fee_per_installment);
  const [error, setError] = useState();

  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [saving, setSaving] = useState(false);
  const [expiryError, setExpiryError] = useState('');
  const [cvcError, setCvcError] = useState('');

  const handleCardNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, '').substring(0, 16);
    const formattedInput = input.replace(/(\d{4})(?=\d)/g, '$1-');
    setCardNumber(formattedInput);
  };

  const handleExpiryDateChange = (e) => {
    const input = e.target.value.replace(/\D/g, '').substring(0, 4);
    const formattedInput = input.replace(/(\d{2})(?=\d)/g, '$1/');
    setExpiryDate(formattedInput);

    const month = parseInt(input.substring(0, 2));
    const year = parseInt(input.substring(2, 4));
    if (month > 12) {
      setExpiryError('Month cannot be greater than 12');
    } else {
      setExpiryError('');
    }
  };

  const handleCvcChange = (e) => {
    const input = e.target.value.replace(/\D/g, '').substring(0, 3);
    setCvc(input);

    if (input.length !== 3) {
      setCvcError('CVC must be 3 digits');
    } else {
      setCvcError('');
    }
  };

  async function loadFee() {
    try {
      const response = await axios.get(`/view/fee/${fee_id}`);
      setFee(response.data.fees.fee[0]);
      setStudent(response.data.fees.user[0]);
    } catch (error) {
      console.error('Error fetching fee data:', error);
    }
  }

  useEffect(() => {
    loadFee();
  }, []);

  if (!fee) {
    return <div>Loading fee data...</div>;
  }

  const currentDate = new Date();
  const dueDate = new Date(fee.due_date);
  const lateFine = dueDate.getTime() < currentDate.getTime() ? fee.late_fee_fine : 0;
  const remaining_installments = Number(fee?.installments_allowed) - fee?.transactions?.length;
  const remaining_dues_arr = fee?.transactions?.map((tran) => tran.total_amount);
  let total_remaining_dues = fee.fee - remaining_dues_arr?.reduce((a, b) => a + b, 0);
  const totalFee = installment ? installmentFee : Number(lateFine) + Number(total_remaining_dues);

  const createInstallment = () => {
    setInstallment(true);
  };

  const handleSubmit = async (e) => {
    setSaving(true);

    e.preventDefault();

    if (error || expiryError || cvcError) return;

    const formData = {
      total_amount: totalFee,
      card_holder: cardHolder,
      card_no: cardNumber.replace(/-/g, ''),
      credit_expiry: expiryDate,
      credit_cvc: cvc,
      late_fine: lateFine,
      payment_method: paymentMethod,
      fee_id: fee_id,
    };

    await axios
      .post('/checkout', formData)
      .then((res) => {
        if (res.data.success) {
          toast.success('Your fee has been submitted successfully');
        }
      })
      .catch(() => { })
      .finally(() => {
        setSaving(false);
        loadFee();
      });
  };

  const downloadVoucher = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Fee Voucher', 14, 22);
    doc.setFontSize(12);
    doc.text(`Student Name: ${student.name}`, 14, 32);
    doc.text(`Student ID: ${student.id}`, 14, 38);
    doc.text(`Semester: ${fee.semester}`, 14, 44);
    doc.text(`Department: ${fee.department}`, 14, 50);
    doc.text(`Assign Date: ${fee.created_at}`, 14, 56);
    doc.text(`Due Date: ${fee.due_date}`, 14, 62);
    doc.text(`Late Fine: PKR ${lateFine}`, 14, 68);
    doc.text(`Total Fee: PKR ${totalFee}`, 14, 74);

    const columns = [
      { title: "Installment", dataKey: "installment" },
      { title: "Amount", dataKey: "amount" },
    ];

    const rows = fee.transactions.map((trans, index) => ({
      installment: `Installment ${index + 1}`,
      amount: `PKR ${trans.total_amount}`,
    }));

    if (installment) {
      rows.push({
        installment: `Installment ${fee.transactions.length + 1}`,
        amount: `PKR ${installmentFee}`,
      });
    }

    doc.autoTable({
      startY: 80,
      head: [columns],
      body: rows,
    });

    doc.save('fee_voucher.pdf');
  };

  return (
    <div className="p-4 rounded-lg shadow-md bg-white">
      <Toaster />
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" className="text-2xl font-bold text-gray-800">
          Fee Voucher
        </a>
        <Button className="ml-auto" onClick={downloadVoucher}>
          Download Voucher
        </Button>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Fee Details</p>
          <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            <div style={{ gridTemplateColumns: '1fr 1fr' }} className="flex grid flex-col rounded-lg bg-white sm:flex-row">
              <div className="flex flex-col px-4 py-4">
                <span className="font-semibold">Semester</span>
                <p className="text-sm">{fee?.semester}</p>
              </div>
              <div className="flex flex-col px-4 py-4">
                <span className="font-semibold">Department</span>
                <p className="text-sm">{fee?.department}</p>
              </div>
              <div className="flex flex-col px-4 py-4">
                <span className="font-semibold">Assign Date</span>
                <p className="text-sm">{fee?.created_at}</p>
              </div>
              <div className="flex flex-col px-4 py-4">
                <span className="font-semibold">Due Date</span>
                <p className="text-sm">{fee?.due_date}</p>
              </div>
            </div>
          </div>

          <h5 className="mt-8 text-lg font-medium">Installments (Only {fee.installments_allowed} Allowed)</h5>
          {fee?.transactions?.map((trans, i) => (
            <div className="relative my-3" key={i}>
              <input className="peer hidden" id={`radio_${i}`} type="radio" name="radio" checked />
              <FaCheck color="green" style={{ border: '3px solid #5eb75e' }} className="p-1 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
              <label className="flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 peer-checked:border-2 peer-checked:border-violet-400 peer-checked:bg-violet-50">
                <img className="w-14 object-contain" src="https://www.svgrepo.com/show/21055/bank-transfer.svg" alt="Bank Transfer" />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">{i + 1} Installment</span>
                  <p className="text-sm leading-6 text-slate-500">
                    <span className="font-semibold text-black">PKR {trans?.total_amount}</span>
                  </p>
                </div>
              </label>
            </div>
          ))}

          {!installment && (
            <div className="relative my-3">
              <input className="peer hidden" id="radio_2" type="radio" name="radio" checked />
              <label className="flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 peer-checked:border-2 peer-checked:border-violet-400 peer-checked:bg-violet-50">
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Pay the remaining dues</span>
                  <p className="text-sm leading-6 text-slate-500">
                    <span className="font-semibold text-black">PKR {total_remaining_dues}</span>
                  </p>
                </div>
              </label>
            </div>
          )}

          <div className="flex items-center">
            {installment && (
              <div>
                <Input
                  label="Installment Fee"
                  type="number"
                  value={installmentFee}
                  onChange={(e) => {
                    if (Number(e.target.value) <= total_remaining_dues) {
                      setInstallmentFee(e.target.value);
                      setError('');
                    } else {
                      setError('Installment Fee should be less than total dues.');
                    }
                  }}
                  required
                />
              </div>
            )}
            <Button className="mx-4 my-3" onClick={createInstallment}>
              Pay in Installment
            </Button>
          </div>
          {error && <span className="font-semibold text-red-500">{error}</span>}

          <p className="mt-8 text-lg font-medium">Late Fine</p>
          <div className="relative my-3">
            <input className="peer hidden" id="radio_3" type="radio" name="radio" checked />
            <label className="flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 peer-checked:border-2 peer-checked:border-violet-400 peer-checked:bg-violet-50">
              <img className="w-14 object-contain" src="https://www.svgrepo.com/show/21055/bank-transfer.svg" alt="Bank Transfer" />
              <div className="ml-5">
                <span className="mt-2 font-semibold">Fine after Due Date</span>
                <p className="text-sm leading-6 text-slate-500">
                  <span className="font-semibold text-black">PKR {lateFine}</span>
                </p>
              </div>
            </label>
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">Complete your payment details below.</p>
          <form onSubmit={handleSubmit}>
            <div className="">
              <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">
                Email
              </label>
              <div className="relative">
                {/* <FaUser className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" /> */}
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </div>
              <label htmlFor="card-holder" className="mt-4 mb-2 block text-sm font-medium">
                Card Holder
              </label>
              <div className="relative">
                {/* <FaUser className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" /> */}
                <input
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  type="text"
                  id="card-holder"
                  name="card-holder"
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your full name here"
                />
              </div>
              <label htmlFor="card-no" className="mt-4 mb-2 block text-sm font-medium">
                Card Details
              </label>
              <div className="flex">
                <div className="relative w-7/12 flex-shrink-0">
                  {/* <FaCreditCard className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" /> */}
                  <input
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    type="text"
                    id="card-no"
                    name="card-no"
                    className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    maxLength="19"
                  />
                </div>
                <input
                  type="text"
                  name="credit-expiry"
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  maxLength="5"
                />
                <input
                  type="text"
                  name="credit-cvc"
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="CVC"
                  value={cvc}
                  onChange={handleCvcChange}
                  maxLength="3"
                />
              </div>
              {expiryError && <p className="text-red-500 text-sm">{expiryError}</p>}
              {cvcError && <p className="text-red-500 text-sm">{cvcError}</p>}
            </div>

            <div className="mt-6 border-t border-b py-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-400">Subtotal</span>
                <span className="font-semibold text-gray-600">PKR {fee.fee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-400">Late Fine</span>
                <span className="font-semibold text-gray-600">PKR {lateFine}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-400">Total</span>
                <span className="font-semibold text-gray-600">PKR {totalFee}</span>
              </div>
            </div>
            <button
              className="mt-4 mb-8 w-full rounded-md bg-blue-500 px-6 py-3 font-medium text-white"
              type="submit"
              disabled={saving}
            >
              {saving ? 'Processing...' : 'Pay Now'}
            </button>
          </form>
        </div>
      </div>


    </div >
  );
}
