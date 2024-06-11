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
import './style.css'
import axios from "axios";
import * as Yup from 'yup';
import toast, { Toaster } from "react-hot-toast";



const isEditUser = window.location.pathname.split('/')[3] == 'edit';
const user_id = window.location.pathname.split('/').pop();

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .matches(/^[a-zA-Z ]*$/, 'Name must contain only alphabets and spaces')
        .required('Name is required'),
    phone: Yup.string()
        .matches(/^\d{11}$/, 'Phone number is invalid')
        .required('Phone number is required'),
    batch: Yup.string()
        .matches(/^[a-zA-Z0-9-]*$/, 'Roll number must contain only -, numbers, and alphabets')
        .required('Roll number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: isEditUser ? '' : Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    semester: Yup.string().required('Semester is required'),
    class_id: Yup.number().required('Department is required'),
});



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


export function UerForm() {

    const [classes, setClasses] = useState([])
    const [formValues, setFormValues] = useState({ scholorship: false })
    const [errors, setErrors] = useState({});

    const loadUser = async () => {
        await axios.get(`/api/user/${user_id}`)
            .then((res) => {
                if (res.data.success) {
                    setFormValues(res.data.user)
                }
            })
            .catch((e) => { console.log(e) })

    }

    useEffect(() => {

        if (isEditUser) {
            loadUser();
        }

    }, [])
    const createUser = async () => {
        try {
            await validationSchema.validate(formValues, { abortEarly: false });
            const endpoint = isEditUser ? '/update/user' : '/save/user';
            const res = await axios.post(endpoint, { ...formValues });
            if (res.data.success) {
                setFormValues(res.data.user);
                toast.promise(
                    Promise.resolve(),
                    {
                        loading: 'Saving...',
                        success: 'User saved successfully!',
                        error: 'Failed to save user!',
                    },
                    {
                        success: {
                            duration: 2000,
                            icon: '\u2714',
                        },
                        error: {
                            duration: 2000,
                            icon: '\u26A0',
                        },
                    }
                );
            } else {
                toast.error('Failed to save user!');
            }
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errorsObject = {};
                error.inner.forEach((err) => {
                    errorsObject[err.path] = err.message;
                });
                setErrors(errorsObject);
            } else if (error.response && error.response.data && error.response.data.errors) {
                const apiErrors = error.response.data.errors;
                const errorMessages = Object.values(apiErrors).flat();
                errorMessages.forEach((errorMessage) => {
                    toast.error(errorMessage);
                });
            } else {
                toast.error('An error occurred. Please try again later.');
            }
        }
    };


    const handleScholorship = (e) => {

        let updatedValue = { ...formValues };
        console.log('updatedValue', updatedValue)
        setFormValues((prevValues) => ({ ...prevValues, ['scholorship']: !updatedValue['scholorship'] }));

    }

    const handleChange = async (e) => {

        const { name, value } = e.target;
        let updatedValue = value;

        if (name === 'batch') {
            updatedValue = value.toUpperCase();
        }
        else if (name == 'email') {
            updatedValue = value.toLowerCase();
        }

        try {
            await validationSchema.validateAt(name, { [name]: updatedValue });
            setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
        } catch (error) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
        }
        setFormValues((prevValues) => ({ ...prevValues, [name]: updatedValue }));
    };


    function loadClasses() {

        axios.get('/view/class').then((res) => {
            setClasses(res?.data?.classes)
        }).catch(e => console.log(e))

    }

    useEffect(() => {
        loadClasses();
    }, [])

    return (
        <Card color="transparent" shadow={false}>

            <Toaster />
            <Typography variant="h4" color="blue-gray">
                {isEditUser ? 'Update ' : 'Register'} Student
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Nice to meet you! Enter your details to {isEditUser ? 'update' : 'register'} student information.
            </Typography>
            <form className="grid mt-8 mb-2 " onSubmit={e => e.preventDefault()}>
                <div className="mb-1 flex flex-col gap-6 grid " style={{ gridTemplateColumns: '1fr 1fr' }}>
                    <div className="field">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Student Name
                        </Typography>
                        <Input
                            name="name"
                            onChange={handleChange}
                            value={formValues['name'] ?? ''}
                            size="lg"
                            placeholder="Zahid Ali"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        {errors['name'] && <div className="text-red-500 mt-1">{errors['name']}</div>}

                    </div>
                    <div className="field">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Student Email
                        </Typography>
                        <Input
                            onChange={handleChange}
                            name="email"
                            value={formValues['email'] ?? ''}
                            size="lg"
                            placeholder="name@mail.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        {errors['email'] && <div className="text-red-500 mt-1">{errors['email']}</div>}

                    </div>
                    <div className="field">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Password
                        </Typography>
                        <Input
                            onChange={handleChange}
                            value={formValues['password'] ?? ''}
                            type="text"
                            name="password"
                            size="lg"
                            placeholder="********"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        {errors['password'] && <div className="text-red-500 mt-1">{errors['password']}</div>}

                    </div>
                    <div className="field">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Department
                        </Typography>
                        <Select value="3" onChange={(value) => { handleChange({ target: { name: 'class_id', value } }) }} name="class_id">
                            {classes?.map((c) => {
                                return <Option key={c.id} value={c.id} >{c.title}</Option>
                            })
                            }
                        </Select>
                        {errors['department'] && <div className="text-red-500 mt-1">{errors['department']}</div>}
                    </div>
                    <div className="field">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Semester
                        </Typography>
                        <Select value={formValues['semester']} required onChange={(value) => { handleChange({ target: { name: 'semester', value } }) }} name="semester">
                            {semesters?.map((c) => {
                                return <Option key={c.id} value={c.title} >{c.title}</Option>
                            })
                            }
                        </Select>
                        {errors['semester'] && <div className="text-red-500 mt-1">{errors['semester']}</div>}
                    </div>
                    <div className="field">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Roll no
                        </Typography>
                        <Input
                            required
                            onChange={handleChange}
                            value={formValues['batch'] ?? ''}
                            type="text"
                            name="batch"
                            size="lg"
                            placeholder="FA20-BCS-000"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none"
                            }}
                        />
                        {errors['batch'] && <div className="text-red-500 mt-1">{errors['batch']}</div>}

                    </div>
                    <div className="field">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Phone
                        </Typography>
                        <Input
                            onChange={handleChange}
                            value={formValues['phone'] ?? ''}
                            type="text"
                            name="phone"
                            size="lg"
                            placeholder="03123456789"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        {errors['phone'] && <div className="text-red-500 mt-1">{errors['phone']}</div>}

                    </div>
                    <div className="field flex" style={{ alignItems: 'center', gap: '30px', flexDirection: 'row' }}>
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Assign Scholorship To This Student
                        </Typography>
                        <input style={{ margin: '0' }} checked={formValues['scholorship']} type="checkbox" name="scholorship" onChange={handleScholorship} />
                    </div>
                </div>

                <Button className="flex items-center gap-3" size="lg" style={{ width: 'fit-content', marginLeft: 'auto' }} onClick={createUser}>
                    Save
                </Button>
            </form>
        </Card>
    );
}