CREATE TABLE IF NOT EXISTS international_accreditations (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO international_accreditations (title, description, image_url) VALUES
('اعتماد دولي من IACBE', 'الاعتماد الدولي لكليات إدارة الأعمال والبرامج التجارية، مما يضمن جودة التعليم وفقاً للمعايير العالمية.', '/international-accreditation-certificate.png'),
('شهادة الجودة ISO 9001', 'شهادة الجودة العالمية التي تؤكد التزامنا بأعلى معايير الجودة في جميع العمليات التعليمية والإدارية.', '/international-accreditation-certificate.png'),
('عضوية CHEA الأمريكية', 'عضوية مجلس اعتماد التعليم العالي الأمريكي، مما يعزز من مكانة الأكاديمية على المستوى الدولي.', '/international-accreditation-certificate.png');
