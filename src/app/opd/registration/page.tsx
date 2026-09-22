"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldWrapper, inputClasses } from "@/components/ui/FieldWrapper";
import { SectionCard } from "@/components/ui/SectionCard";

const registrationSchema = z.object({
  category: z.string().min(1, "Select a registration category"),
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string(),
  dateOfBirth: z.string(),
  gender: z.string().min(1, "Select a gender"),
  mobile: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().email("Enter a valid email").or(z.literal("")),
  bloodGroup: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  emergencyName: z.string(),
  emergencyMobile: z.string(),
  department: z.string().min(1, "Select a department"),
  clinicRoom: z.string(),
  doctor: z.string(),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

export default function RegistrationPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
  });

  function submit(data: RegistrationForm) {
    void data;
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      noValidate
      className="mx-auto max-w-6xl space-y-4"
    >
      <header className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div>
          <h1 className="text-lg font-semibold text-slate-800">
            Outpatient (OPD) Registration
          </h1>
          <p className="text-xs text-slate-400">
            Enterprise patient registration workspace
          </p>
        </div>
        <button
          type="submit"
          className="rounded-md bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
        >
          Register Patient
        </button>
      </header>
      {Object.keys(errors).length > 0 && (
        <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          Please complete the required fields before registering the patient.
        </p>
      )}
      <SectionCard
        number={1}
        title="PATIENT IDENTIFICATION & CORE DEMOGRAPHICS"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FieldWrapper label="Registration category" required>
            <select className={inputClasses} defaultValue="" {...register("category")}>
              <option value="">Select category…</option>
              <option>New Patient</option>
              <option>Follow-up</option>
            </select>
          </FieldWrapper>
          <FieldWrapper label="First name" required>
            <input className={inputClasses} placeholder="Rajesh" {...register("firstName")} />
          </FieldWrapper>
          <FieldWrapper label="Last name">
            <input className={inputClasses} placeholder="Kumar Sharma" {...register("lastName")} />
          </FieldWrapper>
          <FieldWrapper label="Date of birth">
            <input type="date" className={inputClasses} {...register("dateOfBirth")} />
          </FieldWrapper>
          <FieldWrapper label="Gender" required>
            <select className={inputClasses} defaultValue="" {...register("gender")}>
              <option value="">Select…</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </FieldWrapper>
          <FieldWrapper label="Mobile number" required>
            <input className={inputClasses} placeholder="9876543210" {...register("mobile")} />
          </FieldWrapper>
          <FieldWrapper label="Email">
            <input
              type="email"
              className={inputClasses}
              placeholder="patient@example.com"
              {...register("email")}
            />
          </FieldWrapper>
          <FieldWrapper label="Blood group">
            <select className={inputClasses} defaultValue="" {...register("bloodGroup")}>
              <option value="">Unknown</option>
              <option>A+</option>
              <option>B+</option>
              <option>O+</option>
            </select>
          </FieldWrapper>
        </div>
      </SectionCard>
      <SectionCard number={2} title="RESIDENTIAL ADDRESS & EMERGENCY CONTACT">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FieldWrapper label="Residential address" className="lg:col-span-2">
            <input
              className={inputClasses}
              placeholder="Street, flat, landmark"
              {...register("address")}
            />
          </FieldWrapper>
          <FieldWrapper label="City / District">
            <input className={inputClasses} placeholder="Bengaluru" {...register("city")} />
          </FieldWrapper>
          <FieldWrapper label="State">
            <input className={inputClasses} placeholder="Karnataka" {...register("state")} />
          </FieldWrapper>
          <FieldWrapper label="Emergency contact name">
            <input className={inputClasses} {...register("emergencyName")} />
          </FieldWrapper>
          <FieldWrapper label="Emergency contact mobile">
            <input className={inputClasses} {...register("emergencyMobile")} />
          </FieldWrapper>
        </div>
      </SectionCard>
      <SectionCard number={3} title="OPD DEPARTMENT & DOCTOR ASSIGNMENT">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FieldWrapper label="Department" required>
            <select className={inputClasses} defaultValue="" {...register("department")}>
              <option value="">Select department…</option>
              <option>General Medicine</option>
              <option>Cardiology</option>
              <option>Orthopedics</option>
            </select>
          </FieldWrapper>
          <FieldWrapper label="Clinic room">
            <input className={inputClasses} placeholder="OPD-101" {...register("clinicRoom")} />
          </FieldWrapper>
          <FieldWrapper label="Attending doctor">
            <select className={inputClasses} defaultValue="" {...register("doctor")}>
              <option value="">Select doctor…</option>
              <option>Dr. Arvind Mehta</option>
              <option>Dr. Neha Kulkarni</option>
            </select>
          </FieldWrapper>
        </div>
      </SectionCard>
    </form>
  );
}
