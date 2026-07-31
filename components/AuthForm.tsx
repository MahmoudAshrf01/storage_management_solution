"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"
import { Controller } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link"


type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) => {
     return z.object({
      email: z.string().email(),
      fullName: formType === "sign-up" ? z.string().min(2).max(50) 
      : z.string().optional(),
     })
}

const AuthForm = ({ type }: { type: FormType }) => {
  
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage ] = useState("");

    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
        },
    });


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      console.log(values);
    }

    return (
      <>
        <form id="form-rhf-demo" className="auth-form" onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className="form-title">{type === "sign-in" ? "Sign-in" : "Sign-up"}</h1>
          <FieldGroup>
          {type === "sign-up" &&
            <Controller
              name="fullName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Full Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your full name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError className="field-error-message" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          }
           <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError className="field-error-message" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Button type="submit" form="form-rhf-demo" className="form-submit-button text-white" disabled={isLoading} >
            {type === "sign-in" ? "Sign-in" : "Sign-up"}
            {isLoading && <Image src="/assets/icons/loader.svg" alt="Loading" width={24} height={24} className="ml-2 animate-spin" />}
          </Button>
          
          {errorMessage && (
            <p className="error-message">*{errorMessage}</p>
          )}

          <div className="body-2 flex justify-center">
            <p className="text-light-100">
              {type === "sign-in"
              ? "Don't have an account? " 
              : "Already have an account? "
              }
            </p>
            <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                className="ml-1 text-brand font-medium">{`${type === "sign-in" ? "Regester" : "Sign in"}`}</Link>
          </div>

        </form>

      </>
    )
}

export default AuthForm;