# 🚀 Guía Paso a Paso: Configurar AWS para Job Skills Tracker

Todo el código frontend está listo. Ahora vamos a configurar AWS Amplify, Cognito y DynamoDB para que tu aplicación funcione con backend en la nube.

## ✅ Prerequisitos

- Cuenta de AWS (capa gratuita)
- Node.js instalado
- Terminal abierta en el proyecto

---

## 📋 Paso 1: Crear Cuenta de AWS (si no tienes)

1. Ve a https://aws.amazon.com/
2. Click en "Create an AWS Account"
3. Completa el registro (necesitarás tarjeta de crédito, pero NO te cobrarán si te mantienes en la capa gratuita)
4. Verifica tu email y número de teléfono

---

## 🔧 Paso 2: Instalar AWS Amplify CLI

Abre tu terminal en el proyecto y ejecuta:

```bash
npm install -g @aws-amplify/cli
```

Verifica la instalación:

```bash
amplify --version
```

Deberías ver algo como: `12.x.x`

---

## 🔑 Paso 3: Configurar AWS Credentials

Ejecuta este comando y sigue las instrucciones:

```bash
amplify configure
```

**Esto abrirá tu navegador y te pedirá:**

1. **Sign in to AWS Console** - Inicia sesión con tu cuenta de AWS
2. **Specify the AWS Region** - Elige `us-east-1` (es la región con más servicios gratuitos)
3. **Specify the username** - Usa `amplify-dev` o el nombre que prefieras
4. **Click "Next: Permissions"** - Ya tiene los permisos correctos
5. **Click "Next: Tags"** - Skip
6. **Click "Next: Review"** - Revisa
7. **Click "Create user"** - Crea el usuario
8. **Download .csv** - IMPORTANTE: Descarga el archivo con las credenciales
9. Vuelve a la terminal y presiona Enter
10. Pega el **Access Key ID** del archivo CSV
11. Pega el **Secret Access Key** del archivo CSV
12. **Profile Name** - Usa `default` o `amplify-dev`

✅ **Listo!** Tus credenciales de AWS están configuradas.

---

## 🎯 Paso 4: Inicializar Amplify en el Proyecto

En la terminal, dentro de tu proyecto, ejecuta:

```bash
amplify init
```

**Responde las preguntas así:**

```
? Enter a name for the project: jobskillstracker
? Initialize the project with the above configuration? No
? Enter a name for the environment: dev
? Choose your default editor: Visual Studio Code (o el que uses)
? Choose the type of app that you're building: javascript
? What javascript framework are you using: react
? Source Directory Path: src
? Distribution Directory Path: dist
? Build Command: npm run build
? Start Command: npm run dev
? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use: default (o el que creaste)
```

⏳ **Espera 1-2 minutos** mientras Amplify crea los recursos en AWS.

✅ Verás: `✔ Successfully created initial AWS cloud resources`

---

## 🔐 Paso 5: Agregar Autenticación (Cognito)

Ejecuta:

```bash
amplify add auth
```

**Responde así:**

```
? Do you want to use the default authentication and security configuration? Default configuration
? How do you want users to be able to sign in? Email
? Do you want to configure advanced settings? No, I am done.
```

✅ Verás: `✔ Successfully added auth resource`

---

## 💾 Paso 6: Agregar API y Base de Datos (DynamoDB)

Ejecuta:

```bash
amplify add api
```

**Responde así:**

```
? Select from one of the below mentioned services: GraphQL
? Here is the GraphQL API that we will create. Select a setting to edit or continue: Continue
? Choose a schema template: Blank Schema
```

Esto creará un archivo en `amplify/backend/api/[nombre]/schema.graphql`

**Abre ese archivo y reemplaza TODO el contenido con esto:**

```graphql
type JobPosting @model @auth(rules: [{allow: owner}]) {
  id: ID!
  userId: String!
  text: String!
  analyzedAt: AWSDateTime!
  postingDate: AWSDateTime
  companyName: String
  url: String
  skills: [String!]!
  requiresDegree: Boolean!
  workMode: String!
  location: String!
  applied: Boolean!
  applicationDate: AWSDateTime
  notes: String
}
```

Guarda el archivo.

---

## 🚀 Paso 7: Deploy a AWS

Ahora vamos a subir todo a AWS. Ejecuta:

```bash
amplify push
```

**Responde:**

```
? Are you sure you want to continue? Yes
? Do you want to generate code for your newly created GraphQL API? No
```

⏳ **Espera 3-5 minutos** mientras Amplify crea:
- Cognito User Pool (autenticación)
- DynamoDB Table (base de datos)
- AppSync GraphQL API
- Todos los permisos y configuraciones

✅ Verás: `✔ All resources are updated in the cloud`

---

## 📝 Paso 8: Copiar Configuración a tu Código

Después del deploy, Amplify creó un archivo de configuración. Ejecuta:

```bash
cat src/aws-exports.js
```

Verás algo como:

```javascript
const awsmobile = {
    "aws_project_region": "us-east-1",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_XXXXXXX",
    "aws_user_pools_web_client_id": "XXXXXXXXXXXXXXXXXX",
    "aws_appsync_graphqlEndpoint": "https://XXXXX.appsync-api.us-east-1.amazonaws.com/graphql",
    // ... más configuración
};
```

**IMPORTANTE:** Copia TODO ese objeto y pégalo en `src/amplifyconfiguration.ts` reemplazando el contenido actual.

El archivo debería quedar así:

```typescript
const awsmobile = {
    // Pega aquí TODO el contenido de aws-exports.js
};

export const amplifyConfig = awsmobile;
export default amplifyConfig;
```

---

## 🔌 Paso 9: Conectar la Configuración

Abre `src/main.tsx` y agrega al inicio (después de los imports):

```typescript
import { Amplify } from 'aws-amplify';
import amplifyConfig from './amplifyconfiguration';

Amplify.configure(amplifyConfig);
```

---

## ✅ Paso 10: Probar la Aplicación

1. Asegúrate de que el servidor de desarrollo esté corriendo:

```bash
npm run dev
```

2. Abre http://localhost:5173

3. Deberías ver la pantalla de **Login/Registro**

4. **Prueba registrarte:**
   - Email: tu@email.com
   - Contraseña: Debe tener mínimo 8 caracteres, mayúscula, minúscula y número
   - Ejemplo: `Password123`

5. **Inicia sesión** con las credenciales que creaste

6. **Ingresa una oferta de trabajo** y verifica que se guarde

---

## 🎉 ¡Listo!

Tu aplicación ahora está conectada a AWS:
- ✅ Autenticación con Cognito
- ✅ Base de datos con DynamoDB
- ✅ API con AppSync GraphQL
- ✅ Todo en la capa gratuita de AWS

---

## 🔍 Verificar en AWS Console

Puedes ver tus recursos en AWS:

1. Ve a https://console.aws.amazon.com/
2. Busca "Cognito" - Verás tu User Pool con los usuarios registrados
3. Busca "DynamoDB" - Verás tu tabla con las ofertas guardadas
4. Busca "AppSync" - Verás tu API GraphQL

---

## 🐛 Troubleshooting

### Error: "User is not authenticated"
- Asegúrate de haber copiado correctamente la configuración de `aws-exports.js`
- Verifica que `Amplify.configure()` esté en `main.tsx`

### Error: "Network error"
- Verifica tu conexión a internet
- Revisa que el `amplify push` haya terminado exitosamente

### Error al registrarse
- La contraseña debe tener mínimo 8 caracteres, mayúscula, minúscula y número
- El email debe ser válido

### No se guardan las ofertas
- Abre la consola del navegador (F12) y busca errores
- Verifica que hayas hecho `amplify push` correctamente

---

## 📊 Monitorear Costos

Para asegurarte de que te mantienes en la capa gratuita:

1. Ve a https://console.aws.amazon.com/billing/
2. Click en "Bills" en el menú izquierdo
3. Deberías ver $0.00 si todo está en la capa gratuita

---

## 🚀 Próximos Pasos (Opcional)

Una vez que todo funcione:

1. **Deploy a producción:**
   ```bash
   amplify add hosting
   amplify publish
   ```

2. **Agregar workspaces múltiples** (lo haremos después)

3. **Agregar OAuth** (Google/GitHub login)

---

## 📞 ¿Necesitas Ayuda?

Si algo no funciona:
1. Revisa los errores en la consola del navegador (F12)
2. Ejecuta `amplify status` para ver el estado de tus recursos
3. Ejecuta `amplify console` para abrir la consola de AWS

---

**¡Avísame cuando hayas completado estos pasos y te ayudo con cualquier problema que surja!**
