import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Input } from '@material-tailwind/react';
import { FaCheck, FaCheckCircle } from 'react-icons/fa';
// import { Button } from '@tailwindcss/react'; // Import Button component

const fee_id = window.location.pathname.split('/').pop();

export default function ViewFee() {

  const [fee, setFee] = useState(null);
  const [installment, setInstallment] = useState(0);
  const [installmentFee, setInstallmentFee] = useState(fee?.min_fee_per_installment)
  async function loadFee() {
    try {
      const response = await axios.get(`/view/fee/${fee_id}`);
      setFee(response.data.fees[0]);
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
  const totalFee = installment ? installmentFee : Number(lateFine) + Number(fee.fee);
  const remaining_installments = Number(fee?.installments_allowed) - fee?.transactions?.length
  const remaining_dues_arr = fee?.transactions?.map((tran,i) => tran.total_amount)
  let total_remaining_dues = fee.fee-  remaining_dues_arr?.reduce((a, b) => a + b, 0)

  // console.log('remaining_dues',total_remaining_dues)
  const createInstallment = () => {
    setInstallment(true)
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    let formValues = new FormData(e.target);

    await axios.post('/checkout', formValues)
      .then(() => {

      })
      .catch(() => {

      })
  }

  return (
    <div className="p-4 rounded-lg shadow-md bg-white">
      <div class="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" class="text-2xl font-bold text-gray-800">Fee Voucher</a>
      </div>
      <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div class="px-4 pt-8">
          <p class="text-xl font-medium">Fee Details</p>
          <p class="text-gray-400">Check your items. And select a suitable shipping method.</p>
          <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            <div style={{ gridTemplateColumns: "1fr 1fr" }} class="flex grid flex-col rounded-lg bg-white sm:flex-row">
              <div class="flex  flex-col px-4 py-4">
                <span class="font-semibold">Semester</span>
                <p class="text-sm">{fee?.semester}</p>
              </div>
              <div class="flex flex-col px-4 py-4">
                <span class="font-semibold">Department</span>
                <p class="text-sm">{fee?.department}</p>
              </div>
              <div class="flex flex-col px-4 py-4">
                <span class="font-semibold">Assign Date</span>
                <p class="text-sm">{fee?.created_at}</p>
              </div>
              <div class="flex flex-col px-4 py-4">
                <span class="font-semibold">Due Date</span>
                <p class="text-sm">{fee?.due_date}</p>
              </div>
            </div>
          </div>

          <h5 class="mt-8 text-lg font-medium">Installments (Only {fee.installments_allowed} Allowed)</h5>
          {
            fee?.transactions?.map((trans, i) => {
              return <div class="relative my-3">
                <input class="peer hidden" id="radio_2" type="radio" name="radio" checked />
                <FaCheck color='green' style={{ border: '3px solid #5eb75e' }} className='p-1 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white' />
                {/* <span style={{background:'green',border:'3px solid green'}} class={`paid-fee absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white`}></span> */}
                <label class={`paid-fee flex cursor-pointer select-none rounded-lg border border-green-300 p-4`} for="radio_2">
                  <div class="ml-5 w-80">
                    <span class="mt-2 font-semibold">Installment {(i + 1)}  ( Paid )</span>
                    <div>
                      <Input disabled value={`PKR ${trans?.total_amount}`} placeholder={`minimum ${Number(fee.min_fee_per_installment)}`} className='w-full' type="text" name='installment' />
                    </div>
                  </div>
                </label>
              </div>
            })}
          {
            installment ? <div class="relative">
              <input class="peer hidden" id="radio_2" type="radio" name="radio" checked />
              <span class={` absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white`}></span>
              <label class={` flex cursor-pointer select-none rounded-lg border border-gray-300 p-4`} for="radio_2">
                <div class="ml-5 w-80">
                  <span class="mt-2 font-semibold">Installment {fee?.transactions?.length + 1}</span>
                  <div>
                    <Input value={installmentFee} onChange={(e) => { setInstallmentFee(e.target.value) }} min={Number(fee?.min_fee_per_installment)} placeholder={`minimum ${Number(fee.min_fee_per_installment)}`} className='w-full' type="number" name='installment' />
                  </div>
                </div>
              </label>
            </div> : ''
          }

          {remaining_installments >= 1 && <>
            {!installment ? <Button size='sm' type='button' onClick={createInstallment}>
              Create Installment
            </Button>
              :
              <Button size='sm' type='button' onClick={() => { setInstallment(false) }}>
                Cancell
              </Button>
            }
          </>}
        </div>
        <div class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p class="text-xl font-medium">Payment Details</p>
          <p class="text-gray-400">Complete your order by providing your payment details.</p>
          <form onSubmit={handleSubmit}>
            <div class="">
              <label for="email" class="mt-4 mb-2 block text-sm font-medium">Email</label>
              <div class="relative">
                <input type="text" id="email" name="email" class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com" />
                <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
              <label for="card-holder" class="mt-4 mb-2 block text-sm font-medium">Card Holder</label>
              <div class="relative">
                <input type="text" id="card-holder" name="card_holder" class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your full name here" />
                <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                  </svg>
                </div>
              </div>
              <label for="card-no" class="mt-4 mb-2 block text-sm font-medium">Card Details</label>
              <div class="flex">
                <div class="relative w-7/12 flex-shrink-0">
                  <input type="text" id="card-no" name="card_no" class="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="xxxx-xxxx-xxxx-xxxx" />
                  <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg class="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                      <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                    </svg>
                  </div>
                </div>
                <input type="text" name="credit_expiry" class="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="MM/YY" />
                <input type="text" name="credit_cvc" class="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="CVC" />
              </div>
              <input name='total_amount' value={totalFee} hidden />
              <input name='late_fine' value={lateFine ?? 0} hidden />
              <input name='fee_id' value={fee.id} hidden />
              <input name='payment_method' value='master' hidden />

              <div class="mt-6 border-t border-b py-2">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-gray-900">Total Fee</p>
                  <p class="font-semibold text-gray-900">PKR {Number(fee?.fee)}</p>
                </div>
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-gray-900">Remaining Due</p>
                  <p class="font-semibold text-gray-900">PKR {Number(total_remaining_dues ?? 0)}</p>
                </div>
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-gray-900">Late Fine</p>
                  <p class="font-semibold text-gray-900">PKR {Number(lateFine ?? 0)}</p>
                </div>
              </div>
              <div class="mt-6 flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Payable</p>
                <p class="text-2xl font-semibold text-gray-900">PKR {totalFee}</p>
              </div>
            </div>
            <button class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Pay</button>
          </form>

        </div>
      </div>

    </div>
  );
}
