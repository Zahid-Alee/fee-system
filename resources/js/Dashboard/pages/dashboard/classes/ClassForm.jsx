import {
    Card,
    Input,
    Button,
    Typography,
    Textarea,
} from "@material-tailwind/react";
import { useState } from "react";

export function ClassForm({ formValues, setFormValues }) {
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        const updatedValues = { ...formValues };
        updatedValues[name] = value;
        if (name === 'title' && !/^[a-zA-Z\s]*$/.test(value)) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: 'Name must only contain alphabets and spaces.' }));
        } else if (name === 'description' && !/^[a-zA-Z\s]*$/.test(value)) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: 'Description must only contain alphabets and spaces.' }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
        }
        setFormValues(updatedValues);
    }

    return (
        <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
                Add Department
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Nice to meet you! Enter details to add department.
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={e => e.preventDefault()}>
                <div className="mb-1 flex flex-col gap-6">
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Name
                    </Typography>
                    <Input
                        name="title"
                        onChange={handleChange}
                        value={formValues['title'] ?? ''}
                        size="lg"
                        placeholder="Department Name"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                    {errors['title'] && <div className="text-red-500 mt-1">{errors['title']}</div>}

                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Description (optional)
                    </Typography>
                    <Textarea
                        name="description"
                        onChange={handleChange}
                        placeholder="Write Description"
                        value={formValues['description'] ?? ''}
                    />
                    {errors['description'] && <div className="text-red-500 mt-1">{errors['description']}</div>}
                </div>
            </form>
        </Card>
    );
}
