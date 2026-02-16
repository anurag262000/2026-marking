'use server';

export async function sendEmail(formData) {
  const serviceId = process.env.NEXT_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_EMAILJS_KEY;

  if (!serviceId || !templateId || !publicKey) {
    return {
      success: false,
      message: 'Server configuration error: Missing EmailJS keys.',
    };
  }

  const data = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    template_params: {
      user_name: formData.get('name'),
      user_email: formData.get('email'),
      user_phone: formData.get('phone'),
      user_company: formData.get('company'),
      user_message: formData.get('message'),
    },
    accessToken: process.env.NEXT_EMAILJS_PRIVATE_KEY, // Required for strict mode
  };

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('EmailJS Error:', errorText);
      return {
        success: false,
        message: `EmailJS Error: ${errorText}`, // Return the actual error to the client
      };
    }

    return { success: true };
  } catch (error) {
    console.error('EmailJS Fetch Error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
}
