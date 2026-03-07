export default function MarqueeBanner() {
  const items = ["JEE Advanced 2024 Results","NEET UG 2024 Results","10 Million+ Students Enrolled","IIT JEE Toppers 2024","Free Live Classes","Study Material Available","Class 6–12 Courses","Foundation Batch Open"];
  const doubled = [...items,...items];
  return (
    <>
      <style>{`
        .mq-wrap{background:#5b2dc4;padding:10px 0;overflow:hidden;display:flex;}
        .mq-track{display:flex;white-space:nowrap;animation:marquee 22s linear infinite;}
        .mq-item{color:#fff;font-size:13px;font-weight:600;padding:0 28px;display:flex;align-items:center;gap:10px;font-family:'Poppins',sans-serif;}
        .mq-star{color:#fde047;font-size:10px;}
      `}</style>
      <div className="mq-wrap">
        <div className="mq-track">
          {doubled.map((item,i) => (
            <span key={i} className="mq-item">
              <span className="mq-star">★</span>{item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
