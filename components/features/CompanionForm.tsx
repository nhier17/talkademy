"use client";

import { useState } from "react";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import CustomFormField, { FormFieldType } from "./CustomFormField";
import { subjects } from "@/constants";
import { Button } from "../ui/button";
import { companionSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { createCompanion } from "@/lib/actions/companion.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


const voices = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
];

const styles = [
    { value: 'casual', label: 'Casual' },
    { value: 'formal', label: 'Formal' },
];

export default function CompanionForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof companionSchema>>({
        resolver: zodResolver(companionSchema),
        defaultValues: {
            name: '',
            subject: '',
            topic: '',
            voice: '',
            style: '',
            duration: 15,
        },
    });

    const onSubmit = async (values: z.infer<typeof companionSchema>) => {
        setLoading(true);
        try {
            const companion = await createCompanion(values);
            console.log(companion);
            if(companion) {
                toast.success("Companion created successfully🤝");
                router.push(`/companions/${companion.id}`);
            } else {
                toast.error("Failed to create companion");
                router.push("/")
            }
        } catch (error) {
            console.error("Failed to create companion", error);
        } finally {
            setLoading(false);
        }
    };

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CustomFormField
                name="name"
                label="Companion name"
                control={form.control}
                placeholder="Enter the companion name"
                fieldType={FormFieldType.INPUT}
            />
            <CustomFormField
                name="subject"
                label="Subject"
                control={form.control}
                placeholder="Select the subject"
                fieldType={FormFieldType.SELECT}
                options={subjects.map((subject) => ({ value: subject, label: subject }))}
            />
            <CustomFormField
                name="topic"
                label="What should the companion help with?"
                control={form.control}
                placeholder="Ex. Derivates & Integrals"
                fieldType={FormFieldType.INPUT}
            />
            <CustomFormField
                name="voice"
                label="Voice"
                control={form.control}
                placeholder="Select the voice"
                fieldType={FormFieldType.SELECT}
                options={voices.map((voice) => ({ value: voice.value, label: voice.label }))}
            />
            <CustomFormField
                name="style"
                label="Style"
                control={form.control}
                placeholder="Select the style"
                fieldType={FormFieldType.SELECT}
                options={styles.map((style) => ({ value: style.value, label: style.label }))}
            />
            <CustomFormField
                name="duration"
                label="Estimated session duration in minutes"
                control={form.control}
                placeholder="15"
                fieldType={FormFieldType.INPUT}
            />
             <Button disabled={loading} type="submit" className="w-full cursor-pointer">
                Build Your Companion   {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            </Button>
        </form>
    </Form>
  )
};
