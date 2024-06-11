import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Select,
    Option,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import './../users/style.css'
import * as Yup from 'yup';

const semesters = [
    { id: 1, title: '1st Semester' },
    { id: 2, title: '2nd Semester' },
    { id: 3, title: '3rd Semester' },
    { id: 4, title: '4rth Semester' },
    { id: 5, title: '5th Semester' },
    { id: 6, title: '6th Semester' },
    { id: 7, title: '7th Semester' },
    { id: 8, title: '8th Semester' },
]

const validationSchema = Yup.object().shape({
    class_id: Yup.number().required('Department is required'),
    semester: Yup.string().required('Semester is required'),
    fee: Yup.number().min(0, 'Fee must be a positive number').required('Fee is required'),
    due_date: Yup.date().required('Due date is required'),
    late_fee_fine: Yup.number().min(0, 'Late fee fine must be a positive number').required('Late fee fine is required'),
    installments_allowed: Yup.number().min(1, 'Installments allowed must be at least 1').required('Installments allowed is required'),
    min_fee_per_installment: Yup.number().min(0, 'Minimum fee per installment must be a positive number').required('Minimum fee per installment is required'),
});


const isEditFee = window.location.pathname.split('/')[3] == 'edit';
const fee_id = window.location.pathname.split('/').pop();

export function FeeForm() {

    const [classes, setClasses] = useState([])
    const [formValues, setFormValues] = useState({});
    const [errors, setErrors] = useState({});


    useEffect(() => {
        loadClasses();
        if (isEditFee) {
            loadFee()
        }
    }, [])

    const loadFee = async () => {

        await axios.get(`/view/fee/${fee_id}`)
            .then((res) => {
                if (res.data.success) {
                    setFormValues(res.data.fees)
                }
            })
            .catch((e) => { console.log(e) })
    }


    const createFee = async () => {
        try {
            await validationSchema.validate(formValues, { abortEarly: false });

            const res = await axios.post(isEditFee ? '/update/fee' : '/save/fee', { ...formValues });
            if (res.data.success) {
                setFormValues(res.data.fees)
            } else {
            }
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const validationErrors = {};
                error.inner.forEach((err) => {
                    validationErrors[err.path] = err.message;
                });
                setErrors(validationErrors);
            } else {
                console.log(error);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        const updatedValues = { ...formValues };
        updatedValues[name] = value;

            if (name === 'due_date') {
            const currentDate = new Date();
            const selectedDate = new Date(value);
    
            if (selectedDate <= currentDate) {
                setErrors((prevErrors) => ({ ...prevErrors, [name]: 'Please select a valid due date.' }));
            } else {
                setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
            }
        }
    
        setFormValues(updatedValues);
    }
    




    function loadClasses() {

        axios.get('/view/class').then((res) => {
            setClasses(res?.data?.classes)
        }).catch(e => console.log(e))

    }

    return (
        <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
                Fee Structure
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Nice to meet you! Create fee structure.
            </Typography>
            <form className="mt-8 mb-2" onSubmit={e => e.preventDefault()}>
                <div className="mb-1 flex flex-col gap-6 grid" style={{ gridTemplateColumns: '1fr 1fr' }}>

                    <div className="field">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Department
                        </Typography>
                        <Select onChange={(value) => { handleChange({ target: { name: 'class_id', value } }) }} label="Select Class" name="class_id">
                            {classes?.map((c) => {
                                return <Option key={c.id} value={c.id} >{c.title}</Option>
                            })
                            }
                        </Select>
                        {errors['class_id'] && <div className="text-red-500 mt-1">{errors['class_id']}</div>}
                    </div>
                    <div className="field">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Semester
                        </Typography>
                        <Select value={formValues['semester']} onChange={(value) => { handleChange({ target: { name: 'semester', value } }) }} label="Select Class" name="class_id">
                            {semesters?.map((c) => {
                                return <Option key={c.id} value={c.title} >{c.title}</Option>
                            })
                            }
                        </Select>
                        {errors['semester'] && <div className="text-red-500 mt-1">{errors['semester']}</div>}
                    </div>
                    <div className="field">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Fee
                        </Typography>
                        <Input
                            onChange={handleChange}
                            value={formValues['fee'] ?? ''}
                            type="number"
                            name="fee"
                            size="lg"
                            placeholder="1000"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        {errors['fee'] && <div className="text-red-500 mt-1">{errors['fee']}</div>}
                    </div>
                    <div className="field">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Due Date
                        </Typography>
                        <Input
                            onChange={handleChange}
                            value={formValues['due_date'] ?? ''}
                            type="date"
                            name="due_date"
                            size="lg"
                            placeholder="03126847976"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        {errors['due_date'] && <div className="text-red-500 mt-1">{errors['due_date']}</div>}

                    </div>
                    <div className="field">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Late Fee Fine
                        </Typography>
                        <Input
                            onChange={handleChange}
                            value={formValues['late_fee_fine'] ?? ''}
                            type="number"
                            name="late_fee_fine"
                            size="lg"
                            placeholder="03126847976"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        {errors['late_fee_fine'] && <div className="text-red-500 mt-1">{errors['late_fee_fine']}</div>}
                    </div>
                    <div className="field">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Installments Allowed (count)
                        </Typography>
                        <Input
                            onChange={handleChange}
                            value={formValues['installments_allowed'] ?? ''}
                            type="number"
                            name="installments_allowed"
                            size="lg"
                            placeholder="03126847976"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        {errors['installments_allowed'] && <div className="text-red-500 mt-1">{errors['installments_allowed']}</div>}

                    </div>
                    <div className="field">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Minimum Fee Per Installment
                        </Typography>
                        <Input
                            onChange={handleChange}
                            value={formValues['min_fee_per_installment'] ?? ''}
                            type="number"
                            name="min_fee_per_installment"
                            size="lg"
                            placeholder="03126847976"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        {errors['min_fee_per_installment'] && <div className="text-red-500 mt-1">{errors['min_fee_per_installment']}</div>}
                    </div>
                </div>
                <Button className="flex items-center gap-3" size="lg" style={{ width: 'fit-content', marginLeft: 'auto' }} onClick={() => { createFee() }}>
                    Save
                </Button>
            </form>
        </Card>
    );
}