"use client"
export const registerPatient = async (formdata: FormData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/create-patient`,{
     method:"POST" ,
     body:formdata,
     cache:"no-store"

    })
    const patientInfo =res.json()
    return patientInfo
}