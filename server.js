const express = require('express');
const cors = require('cors');

const app = express();
// استخدام المنفذ الذي يحدده Render تلقائياً أو المنفذ 3000 محلياً
const PORT = process.env.PORT || 10000;

// Middleware (السماح بالطلبات من أي مصدر CORS وتفسير JSON)
app.use(cors());
app.use(express.json());

// قاعدة بيانات مؤقتة في الذاكرة (يمكن استبدالها لاحقاً بـ MongoDB أو Supabase)
let userScores = {};

// مسار رئيسي لفحص حالة الخادم
app.get('/', (req, res) => {
    res.json({ 
        status: 'success', 
        message: 'Arabic Learning API is running successfully on Render 🚀' 
    });
});

// مسار حفظ النقاط سحابياً
app.post('/api/save-score', (req, res) => {
    const { userId, score } = req.body;
    
    if (!userId || score === undefined) {
        return res.status(400).json({ success: false, error: 'Missing userId or score' });
    }

    userScores[userId] = score;
    console.log(`Saved score for user [${userId}]: ${score}`);

    res.json({ 
        success: true, 
        message: 'Score saved successfully', 
        userId, 
        score 
    });
});

// مسار جلب النقاط الخاصة بالمستخدم
app.get('/api/score/:userId', (req, res) => {
    const { userId } = req.params;
    const score = userScores[userId] || 0;
    res.json({ success: true, userId, score });
});

// تشغيل الخادم
app.listen(PORT, () => {
    console.log(`Server is running and listening on port ${PORT}`);
});