<template>
  <div class="cc" dir="ltr">

    <!-- ═══════════════════════════ صفحة 1 ═══════════════════════════ -->
    <div class="page" dir="rtl">

      <!-- Watermark -->
      <div class="wm"><img src="/images/logo/logo.png" alt="" /></div>

      <!-- ══ رأس العقد ══ -->
      <div class="hdr">
        <div class="hdr-text">
          <div class="hdr-co">شركة التكامل للاتصالات وتقنية المعلومات</div>
          <div class="hdr-svc">خدمة الإنترنت</div>
          <div class="hdr-srv">Service Contract (عقد خدمات)</div>
        </div>
        <div class="hdr-logo">
          <img src="/images/logo/logo.png" alt="التكامل نت" />
        </div>
        <div class="hdr-qr">
          <qrcode-vue :value="`https://altkamel.ly`" :size="92" level="M" />
        </div>
      </div>

      <!-- شريط أزرق -->
      <div class="bar"></div>

      <!-- ══ بيانات المشترك ══ -->
      <div class="sec">
        <div class="sec-title">Subscriber information (بيانات المشترك)</div>
        <div class="grid2">
          <div class="field" dir="ltr"><span class="flbl">First name:</span><span class="fval rtl">{{ userData?.name || displayName.split(' ')[0] || 'غير محدد' }}</span></div>
          <div class="field" dir="ltr"><span class="flbl">Last name:</span><span class="fval rtl">{{ userData?.lastname || displayName.split(' ').slice(1).join(' ') || 'غير محدد' }}</span></div>
          <div class="field" dir="ltr"><span class="flbl">Address:</span><span class="fval rtl">{{ userData?.nearest_point || 'طرابلس' }}</span></div>
          <div class="field" dir="ltr"><span class="flbl">Nearest Point:</span><span class="fval rtl">{{ userData?.address || 'غير محدد' }}</span></div>
          <div class="field" dir="ltr"><span class="flbl">Email:</span><span class="fval mono">{{ userData?.email || 'N/A' }}</span></div>
          <div class="field" dir="ltr"><span class="flbl">Nationality:</span><span class="fval rtl">ليبي</span></div>
          <div class="field" dir="ltr"><span class="flbl">Mobile:</span><span class="fval mono" dir="ltr">{{ userData?.phone || 'غير محدد' }}</span></div>
          <div class="field" dir="ltr"><span class="flbl">ID No:</span><span class="fval">{{ userData?.id_number || '------' }}</span></div>
        </div>
      </div>

      <div class="bar"></div>

      <!-- ══ تفاصيل الخدمة ══ -->
      <div class="sec">
        <div class="sec-title">Service Details (تفاصيل الخدمة)</div>
        <div class="grid2">
          <div class="field" dir="ltr"><span class="flbl">User Name:</span><span class="fval mono rtl">{{ userData?.username || '—' }}</span></div>
          <div class="field" dir="ltr"><span class="flbl">Password:</span><span class="fval mono">{{ userData?.phone || userData?.contract || '—' }}</span></div>
          <div class="field" dir="ltr"><span class="flbl">Tower:</span><span class="fval rtl">{{ userData?.tower || 'N/A' }}</span></div>
          <div class="field" dir="ltr"><span class="flbl">Service Type:</span><span class="fval underline">Shared</span></div>
          <div class="field" dir="ltr"><span class="flbl">Hardware:</span><span class="fval rtl">LiteBeam 5AC</span></div>
          <div class="field" dir="ltr"><span class="flbl">Package:</span><span class="fval rtl underline">{{ userData?.profile_name || userData?.package || 'Welcome Package' }}</span></div>
        </div>
      </div>

      <div class="bar"></div>

      <!-- ══ بيانات الوكالة ══ -->
      <div class="sec">
        <div class="sec-title">Reseller Info (بيانات الوكالة)</div>
        <div class="grid2">
          <div class="field" dir="ltr"><span class="flbl">Sales:</span><span class="fval rtl">{{ userData?.sales || 'شركة التكامل' }}</span></div>
          <div class="field" dir="ltr"><span class="flbl">Technician:</span><span class="fval rtl">{{ userData?.technician || 'N/A' }}</span></div>
        </div>
      </div>

      <div class="bar"></div>

      <!-- ══ الدعم الفني ══ -->
      <div class="sec">
        <div class="sec-title">Technical Support (الدعم الفني)</div>
        <div class="grid2">
          <div class="field" dir="ltr">
            <span class="flbl">(أرقام الهواتف) Phone Numbers</span>
            <span class="fval mono" dir="ltr">092 333 97 98</span>
          </div>
          <div class="field" dir="ltr"><span class="flbl">WhatsApp:</span><span class="fval mono" dir="ltr">092 333 97 98</span></div>
          <div class="field" dir="ltr"><span class="flbl">Facebook Page:</span><span class="fval" dir="ltr">Altkamel.ly</span></div>
          <div class="field" dir="ltr"><span class="flbl">Email:</span><span class="fval mono" dir="ltr">info@altkamel.ly</span></div>
          <div class="field" dir="ltr"><span class="flbl">Website:</span><span class="fval mono blue" dir="ltr">www.altkamel.ly</span></div>
        </div>
      </div>

      <div class="bar"></div>

      <!-- ══ التوقيع والختم ══ -->
      <div class="sig-area">
        <!-- الختم يسار -->
        <div class="stamp-wrap">
          <img src="/images/logo/logo2.jpeg" alt="ختم الشركة" />
        </div>
        <!-- فراغ لتوزيع -->
        <div class="sig-spacer"></div>
        <!-- التوقيع والتاريخ -->
        <div class="sig-fields" dir="ltr">
          <div class="sig-row-item">
            <span class="sig-lbl">Signature:</span>
            <span class="sig-ln">&nbsp;</span>
          </div>
          <div class="sig-row-item" style="margin-top:14px;">
            <span class="sig-lbl">Date:</span>
            <span class="sig-ln">{{ currentDate }}</span>
          </div>
        </div>
      </div>

    </div><!-- end page 1 -->

    <!-- ═══════════════════════════ صفحة 2 ═══════════════════════════ -->
    <div class="page page2" dir="rtl">

      <h2 class="terms-hdr">الشـروط والأحـكـام</h2>

      <div class="terms-wrap">

        <!-- عمود أيمن -->
        <div class="tc">
          <h3 class="th">التمهيد</h3>
          <p class="tp">يحدد هذا العقد شروط الاستفادة من خدمة شركة التكامل للاتصالات وتقنية المعلومات. عند التوقيع، يصبح هذا العقد نهائيا وملزما ويقر المشترك بأنه منح الوقت الكافي لقراءته وفهمه وأنه قد وافق على ما يتضمنه من شروط وأحكام. كما يسري هذا العقد من تاريخ توقيعه ويعد هذا التمهيد جزءاً لا يتجزأ من هذا العقد ويأخذ أحكامه ويقرأ معه.</p>

          <h3 class="th">تعريفات</h3>
          <div class="tp">
            <p>1. شركة التكامل للاتصالات وتقنية المعلومات هي شبكة اتصالات سلكية ولاسلكية لتقديم خدمات الانترنت والخدمات المضافة موزعة في عدة مدن ليبية.</p>
            <p>2. المشترك: هو كل شخص طبيعي أو اعتباري له الحق القانوني وتسمح له القوانين المعمول بها بالتمتع بخدمات الانترنت.</p>
            <p>3. الخدمات: يستخدم هذا العقد لتقديم كافة أو أحد الخدمات المدرجة أدناه:<br/>- خدمة الإنترنت عبر تقنية واي فاي (Wi-Fi).<br/>- خدمة الإنترنت عبر الألياف البصرية (Fiber).</p>
            <p>4. تاريخ بدأ الخدمة: يعتبر تاريخ تفعيل الخدمة هو تاريخ بدء الخدمة.</p>
            <p>5. مدة الصلاحية: وهي المدة التي يسمح فيها للمشترك التمتع بالخدمة المقدمة من الشركة حسب الخدمة المتعاقد عليها، وفي حالة انتهاء صلاحية الإشتراك في خدمة (واي فاي WIFI) سيتم إلغاء العقد بعد 6 أشهر من تاريخ انتهاء الصلاحية.</p>
          </div>

          <h3 class="th">التزامات الشركة</h3>
          <div class="tp">
            <p>1. توفير كافة اللوازم التقنية لبقاء شبكة الانترنت عاملة بالكفاءة والجودة حسب المعايير القياسية.</p>
            <p>2. تأدية الخدمات والصيانة اللازمة لتقديم الخدمة حسب المعايير القياسية وينحصر ذلك فقط بالمعدات التي تكون تحت تحكم الشركة.</p>
            <p>3. التقيد بصرامة وبسرية المعلومات حسب المعايير الأخلاقية للمهنة.</p>
            <p>4. يلتزم مزود الخدمة بتقديم كل الدعم الفني اللازم لاستمرار توفير الخدمة والرد والمساعدة والإستشارات الفنية عبر الهاتف طيلة الفترة المحددة للدعم الفني.</p>
            <p>5. تقديم الخدمة للمشتركين حسب الخدمة المتعاقد عليها.</p>
            <p>6. الحرص على توفير الخدمة داخل نطاق الشبكة دون ضمان عدم حدوث انقطاع أو أعطال لأسباب خارجة عن إرادة الشركة.</p>
            <p>7. يجوز لشركة التكامل إيقاف الخدمة في حالات التطوير والصيانة التي تتطلب تحديث أو استبدال الشبكات أو وصلات الاتصال.</p>
          </div>

          <h3 class="th">التزامات المشترك</h3>
          <div class="tp">
            <p>1. يجب علي المشترك المحافظة على سرية اسم الدخول وكلمة المرور وعدم منحها لطرف آخر بأي شكل من الأشكال وسيكون المشترك مسؤولاً عن ذلك مسؤولية كاملة.</p>
            <p>2. يلتزم المشترك بتوفير المعدات اللازمة للربط مع شبكة التكامل وتكون تحت عهدته ومسئوليته الخاصة.</p>
            <p>3. تغيير كلمة المرور من وقت لآخر حفاظا على السرية.</p>
            <p>4. يجب على المشترك الإخطار بأي تغييرات في عنوانه أو في معلومات الاتصال الخاصة به.</p>
            <p>5. يتحمل المشترك المسؤولية الكاملة عن تحميل أو رفع أو نقل أي معلومات أو بيانات عبر الشبكة.</p>
            <p>6. يلتزم المشترك بسداد ما يستحق عليه من مبالغ مالية لصالح الشركة وذلك مقابل الخدمات التي يتمتع بها حسب الأسعار المعمول بها حال اشتراكه.</p>
            <p>7. يلتزم المشترك بالإبلاغ عن أي عطل بالخدمة فور حدوثها وفق الطرق المتفق عليها.</p>
            <p>8. يلتزم المشترك بالتقييد بالشروط والأحكام والإجراءات والأنظمة التي تم وضعها من قبل شركة التكامل.</p>
          </div>
        </div>

        <!-- عمود أيسر -->
        <div class="tc">
          <h3 class="th">شروط الاستخدام</h3>
          <div class="tp">
            <p>1. لا يجوز للمشترك أن يستعمل الشبكة أو يستفيد منها في الحالات الآتية:<br/>- إرسال رسائل دون مبرر معقول ينجم عنها تهديد أو مضايقة أو إزعاج أو قلق لأي شخص.<br/>- انتهاك الخصوصية أو أي حق من حقوق النشر أو الطبع أو الملكية الفكرية لأي مصدر معلوماتية.<br/>- مخالفة سياسة الاستعمال الخاصة بشركة التكامل.<br/>- أي عمل من الأعمال الإجرامية أو الأغراض المنافية للقانون أو النظام العام والآداب أو القيم الاجتماعية أو الدينية أو السياسية أو الاقتصادية أو الثقافية لليبيا.</p>
            <p>2. لا يحق للمشترك أن يتاجر في ربط مع شبكة أو يمارس إعادة البيع أو التأجير أو النقل أو يتصرف بأي شكل من الأشكال في خدمة الانترنت من شركة التكامل للاتصالات وتقنية المعلومات دون إذن مكتوب مسبقاً.<br/>تعتبر أي إشعارات أو إخطارات تقوم شركة التكامل بإرسالها الى المشترك، قد سلمت له وفقا لبيانات الاتصال الخاصة بالمشترك في هذا العقد.</p>
            <p>3. يحق للشركة فسخ العقد دون إشعار المشترك في أي من الحالات التالية:<br/>- عند إخلال المشترك بأي بند من بنود عقد الاشتراك ويشمل ذلك محاولة استخدام الخدمة بشكل احتيالي.<br/>- إذا تبين للشركة أن أياً من المعلومات المدرجة من قبل المشترك غير صحيحة أو أنه قد مارس الغش أو التدليس وقت التعاقد للحصول على الخدمة أو التمتع بها.</p>
            <p>4. في حالة التراجع عن العقد يتم ذلك خلال مدة أقصاها 5 أيام من التركيب والتفعيل. ويتحمل المشترك كامل النفقات المترتبة علي ذلك.</p>
          </div>

          <h3 class="th">أحكام عامة</h3>
          <div class="tp">
            <p>1. يجوز لشركة التكامل للاتصالات وتقنية المعلومات الاحتفاظ بهذه الشروط كما هي، أو تعديلها، أو تغييرها، وذلك حسب ما تقتضيه مصلحة الشركة لتحسين خدماتها المقدمة، ويعتبر المشترك موافقاً على جميع هذه الشروط والأحكام وأي تعديلات قد تطرأ عليها وذلك بمجرد استعماله للخدمة بعد الإعلان عنها عبر وسائل النشر (كالموقع الرسمي للشركة أو عبر صفحتها على الفيسبوك) أو إبلاغ المشترك بها عبر وسائل الاتصال التي حددها.</p>
            <p>2. الشركة غير مسؤولة عما يلحق المشترك من أضرار بسبب الظروف القاهرة، أو ما يخرج عن إرادتها مثل الزلازل والفيضانات والحريق وأعمال الحصار والشغب والحروب والإتلاف الخارج عن إرادة الشركة، وكل تصرف أو تدخل صادر من جهات الاختصاص في الدولة. وللشركة الحق في إيقاف الخدمة عن المشترك بناءً على مراسلة من قبل جهات الضبط القضائي والنيابات والمحاكم أو أي جهة أخرى منحها القانون هذا الحق.</p>
            <p>3. تعتبر اللغة الحاكمة في هذا العقد أو النماذج المستخدمة والمراسلات التي تنشأ عنه هي اللغة العربية.</p>
            <p>4. يخضع هذا العقد للشروط والأحكام الصادرة عن شركة التكامل للاتصالات وتقنية المعلومات. كما يخضع لأحكام القوانين واللوائح المعمول بها في ليبيا. ويختص القضاء الليبي بالفصل فيما قد ينشأ عنه من منازعات.</p>
          </div>

          
        </div>

      </div>
    </div><!-- end page 2 -->

  </div>
</template>

<script setup>
import { computed } from 'vue'
import QrcodeVue from 'qrcode.vue'

const props = defineProps({
  userData:    { type: Object, default: () => ({}) },
  balanceData: { type: Object, default: () => ({}) },
})

const displayName = computed(() => {
  const u = props.userData
  if (u?.name) return u.name
  if (u?.firstname) return `${u.firstname} ${u.lastname || ''}`.trim()
  return u?.username || 'عميل'
})

const currentDate = computed(() => {
  const d = new Date()
  return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
})
</script>

<style scoped>
/* ═══════════════════════════════════════════════════
   BASE
═══════════════════════════════════════════════════ */
.cc {
  font-family: Arial, 'Helvetica Neue', sans-serif;
  background: #fff;
  color: #111;
}

/* ═══════════════════════════════════════════════════
   A4 — 210 × 297 mm | padding genereux pour respirer
═══════════════════════════════════════════════════ */
.page {
  width: 210mm;
  height: 290mm;
  overflow: hidden;
  margin: 0 auto;
  padding: 12mm 14mm 10mm;
  background: #fff;
  box-sizing: border-box;
  position: relative;
  page-break-after: always;
  break-after: page;
}
.page2 {
  padding-top: 10mm;
  page-break-after: auto;
  break-after: auto;
}

/* علامة مائية */
.wm {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: .04;
  pointer-events: none;
  z-index: 0;
}
.wm img { width: 68%; object-fit: contain; }

/* ══ هيدر ══ */
.hdr {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  padding-bottom: 7px;
  border-bottom: 3px solid #3b5bdb;
  margin-bottom: 0;
  position: relative;
  z-index: 1;
  flex-shrink: 0;
}

.hdr-text { flex: 1; text-align: right; direction: rtl; }
.hdr-co {
  font-size: 14px;
  font-weight: 900;
  color: #1e3a8a;
  margin-bottom: 4px;
}
.hdr-svc {
  font-size: 12px;
  font-weight: 700;
  color: #222;
  margin-bottom: 3px;
}
.hdr-srv {
  font-size: 11px;
  font-weight: 700;
  color: #444;
  text-decoration: underline;
}

.hdr-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 120px;
}
.hdr-logo img { width: 96px; object-fit: contain; }
.brand-name {
  font-size: 20px;
  font-weight: 900;
  color: #15b37e;
  margin-top: 3px;
  font-family: 'Cairo', Arial, sans-serif;
  white-space: nowrap;
}

.hdr-qr { flex-shrink: 0; width: 94px; }

/* ══ شريط أزرق ══ */
.bar {
  height: 11px;
  background: linear-gradient(90deg, #0b1d6e 0%, #2b44b8 45%, #1488CC 100%);
  margin: 11px 0;
  border-radius: 2px;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

/* ══ أقسام ══ */
.sec {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
}

.sec-title {
  font-size: 12px;
  font-weight: 900;
  text-align: right;
  text-decoration: underline;
  color: #000;
  margin-bottom: 6px;
}

/* شبكة البيانات */
.grid2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px 20px;
}

.field {
  display: flex;
  align-items: center;
  gap: 5px;
  min-height: 20px;
}

.flbl {
  width: 90px;
  font-size: 10.5px;
  font-weight: 700;
  color: #333;
  flex-shrink: 0;
  white-space: nowrap;
}

.fval {
  flex: 1;
  font-size: 10.5px;
  border-bottom: 1px dotted #888;
  padding-bottom: 1px;
  text-align: right;
  direction: ltr;
  min-width: 0;
}
.fval.rtl { direction: rtl; text-align: right; }
.mono { font-family: 'Courier New', monospace; }
.underline { text-decoration: underline; }
.blue { color: #1a56db; }

/* ══ منطقة التوقيع والختم ══ */
.sig-area {
  display: flex;
  align-items: flex-end;
  margin-top: 18mm;
  padding-top: 12px;
  position: relative;
  z-index: 1;
}

.stamp-wrap {
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  opacity: .87;
}
.stamp-wrap img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 1px 3px rgba(30,64,175,.2));
}

.sig-spacer { flex: 1; }

.sig-fields { display: flex; flex-direction: column; }

.sig-row-item {
  display: flex;
  align-items: center;
  gap: 8px;
  direction: ltr;
}
.sig-lbl {
  font-size: 11px;
  font-weight: 700;
  color: #222;
  white-space: nowrap;
}
.sig-ln {
  display: inline-block;
  width: 130px;
  border-bottom: 1px solid #333;
  font-size: 10px;
  text-align: center;
  color: #333;
  padding-bottom: 1px;
}

/* ═══════════════════════════════════════════════════
   صفحة 2 — الشروط والأحكام
═══════════════════════════════════════════════════ */
.terms-hdr {
  text-align: center;
  font-size: 16px;
  font-weight: 900;
  border-bottom: 2px solid #1e3a8a;
  width: fit-content;
  margin: 0 auto 10px;
  padding-bottom: 3px;
  color: #1e3a8a;
}

.terms-wrap {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  font-size: 10px;
  line-height: 1.65;
  text-align: justify;
  direction: rtl;
}

.tc { overflow: hidden; }

.th {
  font-size: 11px;
  font-weight: 900;
  text-decoration: underline;
  margin: 8px 0 3px;
  color: #1e3a8a;
}

.tp { margin-bottom: 4px; }
.tp p { margin: 0 0 3px; }

.final-note {
  margin-top: 12px;
  padding-top: 8px;
  border-top: 1px dashed #aaa;
  font-size: 9px;
  color: #555;
  text-align: center;
  font-style: italic;
  line-height: 1.6;
}

/* ── طباعة ── */
@media print {
  .page { margin: 0; box-shadow: none; }
}
</style>
