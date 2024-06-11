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

export function MyFeeForm({ formValues, setFormValues }) {

    const [classes, setClasses] = useState([])


    const handleChange = (e) => {

        const { name, value } = e.target;

        const updatedValues = { ...formValues };
        updatedValues[name] = value;

        setFormValues(updatedValues);

        console.log('updaed values',updatedValues)
    }


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
            <Typography variant="h4" color="blue-gray">
                Fee Structure
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Nice to meet you! Create fee structure.
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={e => e.preventDefault()}>
                <div className="mb-1 flex flex-col gap-6">
                    
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Department
                    </Typography>
                    <Select value={formValues['class_id']} onChange={(value) => { handleChange({ target: { name: 'class_id', value } }) }} label="Select Class" name="class_id">
                        {classes?.map((c) => {
                            return <Option key={c.id} value={c.id} >{c.title}</Option>
                        })
                        }
                    </Select>
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Semester
                    </Typography>
                    <Select value={formValues['semester']} onChange={(value) => { handleChange({ target: { name: 'semester', value } }) }} label="Select Class" name="class_id">
                        {semesters?.map((c) => {
                            return <Option key={c.id} value={c.title} >{c.title}</Option>
                        })
                        }
                    </Select>
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
                </div>
            </form>
        </Card>
    );
}