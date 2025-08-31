# 🚀 **ORCA Frontend - Vercel Deployment Guide**

## 📋 **Prerequisites**

- ✅ GitHub repository with ORCA project
- ✅ Vercel account (free tier available)
- ✅ Backend deployed and accessible
- ✅ Environment variables ready

---

## 🔧 **Pre-Deployment Setup**

### **1. Environment Variables**

Create a `.env.local` file in your frontend directory:

```env
# Frontend Environment Variables
NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com
NEXT_PUBLIC_APP_NAME=ORCA
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_ENVIRONMENT=production
```

**Important:** Replace `https://your-backend-url.com` with your actual backend URL.

### **2. Test Local Build**

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Test build locally
npm run build

# If successful, proceed to deployment
```

---

## 🚀 **Vercel Deployment**

### **Option A: Vercel CLI (Recommended)**

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from frontend directory
cd frontend
vercel

# Follow the prompts:
# - Set up and deploy? → Yes
# - Which scope? → Select your account
# - Link to existing project? → No
# - Project name? → orca-frontend
# - Directory? → ./
# - Override settings? → No
```

### **Option B: Vercel Dashboard (Web Interface)**

1. **Go to [vercel.com](https://vercel.com)**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure project settings:**

   **Build Settings:**
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

   **Environment Variables:**
   ```
   NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com
   NEXT_PUBLIC_APP_NAME=ORCA
   NEXT_PUBLIC_APP_VERSION=1.0.0
   NEXT_PUBLIC_APP_ENVIRONMENT=production
   ```

---

## ⚙️ **Configuration Files**

### **vercel.json**
Already configured in your project with:
- Build commands
- Output directory
- Security headers
- Function timeouts

### **next.config.ts**
Optimized for:
- React 18 compatibility
- Vercel deployment
- Performance optimization

---

## 🔒 **Environment Variables in Vercel**

### **Required Variables**

1. **Go to your Vercel project dashboard**
2. **Click "Settings" → "Environment Variables"**
3. **Add these variables:**

   ```
   Name: NEXT_PUBLIC_BACKEND_URL
   Value: https://your-backend-url.com
   Environment: Production, Preview, Development
   
   Name: NEXT_PUBLIC_APP_NAME
   Value: ORCA
   Environment: Production, Preview, Development
   
   Name: NEXT_PUBLIC_APP_VERSION
   Value: 1.0.0
   Environment: Production, Preview, Development
   
   Name: NEXT_PUBLIC_APP_ENVIRONMENT
   Value: production
   Environment: Production, Preview, Development
   ```

### **Important Notes**

- **NEXT_PUBLIC_** prefix makes variables available in the browser
- **Production environment** is used for live deployments
- **Preview environment** is used for pull request deployments
- **Development environment** is used for local development

---

## 🌐 **Custom Domain (Optional)**

### **Add Custom Domain**

1. **In Vercel Dashboard:**
   - Go to your project
   - Click "Settings" → "Domains"
   - Add your custom domain

2. **Update DNS Records:**
   - Follow Vercel's DNS configuration instructions
   - Wait for DNS propagation (can take up to 48 hours)

3. **Update Environment Variables:**
   - Update `NEXT_PUBLIC_BACKEND_URL` if needed
   - Ensure CORS is configured for your domain

---

## 🧪 **Testing Deployment**

### **1. Check Build Success**

- Verify build completes without errors
- Check build logs for any warnings
- Ensure all environment variables are loaded

### **2. Test Functionality**

- **Visit your Vercel URL**
- **Check browser console for errors**
- **Test API calls to backend**
- **Verify real-time updates**
- **Test AI chatbot functionality**

### **3. Common Issues**

- **CORS errors**: Check backend CORS configuration
- **API timeouts**: Verify backend URL is correct
- **Build failures**: Check for TypeScript errors
- **Environment variables**: Ensure they're set in Vercel

---

## 📊 **Monitoring & Analytics**

### **Vercel Analytics**

- **Performance monitoring**
- **Error tracking**
- **User analytics**
- **Real-time insights**

### **Health Checks**

- **API endpoint monitoring**
- **Uptime tracking**
- **Performance metrics**
- **Error logging**

---

## 🔄 **Updating Deployment**

### **Automatic Deployments**

- **GitHub integration** automatically deploys on push
- **Pull requests** create preview deployments
- **Main branch** updates production

### **Manual Deployments**

```bash
# Force redeploy
vercel --prod

# Deploy specific branch
vercel --prod --git-branch=feature-branch
```

---

## 🚨 **Troubleshooting**

### **Build Errors**

```bash
# Check build locally
npm run build

# Check for TypeScript errors
npm run lint

# Verify dependencies
npm install
```

### **Runtime Errors**

- **Check browser console**
- **Verify environment variables**
- **Check API endpoints**
- **Verify CORS configuration**

### **Performance Issues**

- **Enable Vercel Analytics**
- **Check bundle size**
- **Optimize images**
- **Enable compression**

---

## 📱 **Mobile & PWA**

### **Progressive Web App**

- **Service worker** for offline functionality
- **App manifest** for install prompts
- **Responsive design** for all devices

### **Mobile Optimization**

- **Touch-friendly interfaces**
- **Responsive layouts**
- **Performance optimization**
- **Accessibility features**

---

## 🔐 **Security Considerations**

### **Headers Configuration**

Already configured in `vercel.json`:
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-Frame-Options**: Prevents clickjacking
- **X-XSS-Protection**: Enables XSS filtering

### **Environment Variables**

- **Never commit** sensitive data to Git
- **Use Vercel's** secure environment variable storage
- **Rotate keys** regularly
- **Monitor access** logs

---

## 💰 **Cost Optimization**

### **Free Tier Limits**

- **100GB bandwidth** per month
- **100GB storage**
- **Unlimited deployments**
- **Custom domains** (with SSL)

### **Upgrade Options**

- **Pro Plan**: $20/month
- **Enterprise**: Custom pricing
- **Additional features**: Team collaboration, advanced analytics

---

## 📈 **Scaling Considerations**

### **Performance**

- **CDN distribution** (automatic with Vercel)
- **Edge functions** for global performance
- **Image optimization** with Next.js
- **Code splitting** for faster loads

### **Monitoring**

- **Real-time metrics**
- **Performance insights**
- **Error tracking**
- **User analytics**

---

## 🎯 **Deployment Checklist**

- [ ] Environment variables configured
- [ ] Local build successful
- [ ] Backend URL updated
- [ ] CORS configured
- [ ] Vercel project created
- [ ] Environment variables set in Vercel
- [ ] Deployment successful
- [ ] Functionality tested
- [ ] Custom domain configured (if applicable)
- [ ] Monitoring enabled
- [ ] Documentation updated

---

## 🆘 **Support Resources**

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **GitHub Issues**: Check your repository for known issues
- **Community Forums**: Vercel and Next.js community support

---

**Your ORCA frontend will be live and accessible worldwide! 🌍**

**Deployment URL**: `https://your-project.vercel.app`
**Custom Domain**: `https://yourdomain.com` (if configured)
