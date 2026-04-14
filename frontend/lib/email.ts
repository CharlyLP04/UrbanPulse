import nodemailer from 'nodemailer';

// Configuración del transporter
// Usa Ethereal si no hay variables de entorno (ideal para desarrollo local)
function getTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Fallback a Ethereal (Development fallback)
  console.warn("ATENCIÓN: Usando Ethereal Email (Development Mode) para el envío de correos. Configura variables SMTP en .env para producción.");
  
  // Para usar Ethereal es buena práctica generar una cuenta on-the-fly, 
  // pero usaremos una configuración rápida si se omite por facilidad
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'test-user@ethereal.email', // Sustituible temporal
        pass: 'test-password' // Sustituible temporal
    }
  });
}

// Para evitar cold-starts de ethereal o mantener un test account activo persistente en memoria:
let testAccount: nodemailer.TestAccount | null = null;
let testTransporter: nodemailer.Transporter | null = null;

export const sendEmail = async (to: string, subject: string, html: string) => {
  let transporter: nodemailer.Transporter;

  if (process.env.SMTP_HOST) {
    transporter = getTransporter();
  } else {
    // Si no tenemos servidor real, generamos un Test Account de Ethereal asincrónicamente
    if (!testAccount) {
        testAccount = await nodemailer.createTestAccount();
        testTransporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });
    }
    transporter = testTransporter!;
  }

  const from = process.env.SMTP_FROM || '"UrbanPulse" <no-reply@urbanpulse.com>';

  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });

    console.log(`Correo enviado a ${to} - Asunto: ${subject}`);
    
    if (!process.env.SMTP_HOST) {
      console.log('--- ENLACE DE ETHEREAL PARA LEER EL CORREO ---');
      console.log(nodemailer.getTestMessageUrl(info));
      console.log('----------------------------------------------');
    }

    return info;
  } catch (error) {
    console.error('Error enviando correo:', error);
    throw error;
  }
};

/**
 * Plantillas específicas
 */

export const sendVerificationEmail = async (email: string, code: string) => {
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #0f4c75;">¡Bienvenido a UrbanPulse!</h2>
      <p>Gracias por registrarte. Para completar tu registro y activar tu cuenta, por favor usa el siguiente código de verificación:</p>
      <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
        <span style="font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #3282b8;">${code}</span>
      </div>
      <p>Este código expira en 30 minutos.</p>
      <hr style="border: none; border-top: 1px solid #ccc; margin-top: 30px;" />
      <p style="font-size: 12px; color: #777;">Si no solicitaste este registro, ignora este mensaje.</p>
    </div>
  `;
  await sendEmail(email, 'UrbanPulse - Verifica tu correo para activar tu cuenta', html);
};

export const sendLogin2FACode = async (email: string, code: string) => {
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #0f4c75;">Verificación de Inicio de Sesión</h2>
        <p>Hemos detectado un intento de inicio de sesión. Por favor ingresa este código temporal de seguridad (2FA) para continuar:</p>
        <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <span style="font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #d04d44;">${code}</span>
        </div>
        <p>Este código expira en 5 minutos.</p>
        <p>Si tú no intentaste iniciar sesión, es posible que alguien conozca tu contraseña. Te sugerimos cambiarla de inmediato.</p>
    </div>
  `;
  await sendEmail(email, 'UrbanPulse - Código de verificación de inicio de sesión', html);
};

export const sendPasswordResetLink = async (email: string, resetLink: string) => {
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #0f4c75;">Recuperación de Contraseña</h2>
          <p>Has solicitado restablecer tu contraseña en UrbanPulse. Haz clic en el siguiente enlace para continuar:</p>
          <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" style="background-color: #3282b8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Restablecer Contraseña</a>
          </div>
          <p>Este enlace expira en 1 hora.</p>
          <p style="font-size: 14px;">Si el botón no funciona, copia y pega esta URL en tu navegador: <br/> 
          <a href="${resetLink}">${resetLink}</a></p>
          <hr style="border: none; border-top: 1px solid #ccc; margin-top: 30px;" />
          <p style="font-size: 12px; color: #777;">Si no solicitaste esto, ignora este mensaje.</p>
      </div>
    `;
    await sendEmail(email, 'UrbanPulse - Restablecer tu contraseña', html);
};
