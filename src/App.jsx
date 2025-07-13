import { useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import './App.css'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import html2pdf from 'html2pdf.js'

function App() {
  const [cvData, setCvData] = useState({
    personalInfo: {
      name: '',
      title: '',
      email: '',
      phone: '',
      linkedin: '',
      github: '',
      militaryStatus: '',
      drivingLicense: '',
      summary: '',
      profileImage: '',
      age: '',
      address: ''
    },
    education: [],
    experience: [],
    skills: [],
    languages: [],
    certifications: [],
    projects: [],
    achievements: [],
    references: [],
    cvLanguage: 'tr'
  })

  // CV başlık çevirileri
  const cvTitles = {
    tr: {
      personalInfo: 'Kişisel Bilgiler',
      education: 'Eğitim',
      experience: 'İş Deneyimi',
      skills: 'Yetenekler',
      languages: 'Diller',
      achievements: 'Başarılar',
      references: 'Referanslar',
      summary: 'Özet',
      websitesAndSocialLinks: 'Websiteler ve Sosyal Medya',
      addEducation: '+ Eğitim Ekle',
      addExperience: '+ Deneyim Ekle',
      addSkill: '+ Yetenek Ekle',
      current: 'Devam ediyor',
      technologies: 'Teknolojiler',
      militaryStatus: 'Askerlik Durumu',
      drivingLicense: 'Ehliyet',
      professionalSummary: 'Profesyonel Özet (ATS için önemli)',
      name: 'Ad Soyad',
      title: 'Ünvan / Meslek',
      email: 'E-posta',
      phone: 'Telefon',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      institution: 'Kurum',
      degree: 'Derece',
      field: 'Alan',
      location: 'Konum',
      startDate: 'Başlangıç',
      endDate: 'Bitiş',
      gpa: 'GPA (Opsiyonel)',
      description: 'Açıklama',
      company: 'Şirket',
      position: 'Pozisyon',
      jobDescription: 'İş Tanımı ve Başarılar',
      skill: 'Yetenek',
      level: 'Seviye',
      category: 'Kategori',
      selectOption: 'Seçiniz',
      beginner: 'Başlangıç',
      intermediate: 'Orta',
      advanced: 'İleri',
      expert: 'Uzman',
      technical: 'Teknik',
      softSkills: 'Yumuşak Beceriler',
      tools: 'Araçlar',
      delete: 'Sil',
      educationItem: 'Eğitim',
      experienceItem: 'Deneyim',
      skillItem: 'Yetenek',
      militaryOptions: {
        done: 'Yapıldı',
        notRequired: 'Yapılmıyor',
        notApplicable: 'Yapılmayacak'
      },
      drivingOptions: {
        A: 'A',
        B: 'B',
        C: 'C',
        D: 'D',
        E: 'E',
        F: 'F'
      },
      skillLevels: {
        beginner: 'Başlangıç',
        intermediate: 'Orta',
        advanced: 'İleri',
        expert: 'Uzman'
      },
      skillCategories: {
        technical: 'Teknik',
        softSkills: 'Yumuşak Beceriler',
        tools: 'Araçlar',
        languageSkills: 'Dil Becerileri'
      }
    },
    en: {
      personalInfo: 'Personal Information',
      education: 'Education',
      experience: 'Experience',
      skills: 'Skills',
      languages: 'Languages',
      achievements: 'Achievements',
      references: 'References',
      summary: 'Summary',
      websitesAndSocialLinks: 'Websites and Social Links',
      addEducation: '+ Add Education',
      addExperience: '+ Add Experience',
      addSkill: '+ Add Skill',
      current: 'Current',
      technologies: 'Technologies',
      militaryStatus: 'Military Status',
      drivingLicense: 'Driving License',
      professionalSummary: 'Professional Summary (Important for ATS)',
      name: 'Full Name',
      title: 'Title / Position',
      email: 'Email',
      phone: 'Phone',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      institution: 'Institution',
      degree: 'Degree',
      field: 'Field',
      location: 'Location',
      startDate: 'Start Date',
      endDate: 'End Date',
      gpa: 'GPA (Optional)',
      description: 'Description',
      company: 'Company',
      position: 'Position',
      jobDescription: 'Job Description and Achievements',
      skill: 'Skill',
      level: 'Level',
      category: 'Category',
      selectOption: 'Select',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      expert: 'Expert',
      technical: 'Technical',
      softSkills: 'Soft Skills',
      tools: 'Tools',
      delete: 'Delete',
      educationItem: 'Education',
      experienceItem: 'Experience',
      skillItem: 'Skill',
      militaryOptions: {
        done: 'Completed',
        notRequired: 'Not Required',
        notApplicable: 'Not Applicable'
      },
      drivingOptions: {
        A: 'A',
        B: 'B',
        C: 'C',
        D: 'D',
        E: 'E',
        F: 'F'
      },
      skillLevels: {
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Advanced',
        expert: 'Expert'
      },
      skillCategories: {
        technical: 'Technical',
        softSkills: 'Soft Skills',
        tools: 'Tools',
        languageSkills: 'Language Skills'
      }
    }
  }

  // CV dili değiştirme fonksiyonu
  const updateCVLanguage = (language) => {
    setCvData(prev => ({
      ...prev,
      cvLanguage: language
    }))
  }

  // Başlık çevirisi alma fonksiyonu
  const getTitle = (key) => {
    return cvTitles[cvData.cvLanguage][key] || key
  }

  // Tarih formatlama fonksiyonları
  const formatDate = (dateString, format = 'month-year') => {
    if (!dateString) return ''
    
    if (format === 'year-only') {
      // Sadece yıl formatı: 2017
      return dateString.split('-')[0]
    } else if (format === 'month-year') {
      // Ay-yıl formatı: 07.2011
      const [year, month] = dateString.split('-')
      return `${month}.${year}`
    }
    return dateString
  }

  const formatDateRange = (startDate, endDate, startFormat = 'month-year', endFormat = 'month-year') => {
    const formattedStart = formatDate(startDate, startFormat)
    const formattedEnd = endDate ? formatDate(endDate, endFormat) : (cvData.cvLanguage === 'tr' ? 'Devam ediyor' : 'Current')
    
    return `${formattedStart} - ${formattedEnd}`
  }

  // Tarih formatı değiştirme fonksiyonu
  const updateDateFormat = (section, id, field, format) => {
    setCvData(prev => ({
      ...prev,
      [section]: prev[section].map(item => 
        item.id === id ? { ...item, [`${field}Format`]: format } : item
      )
    }))
  }

  const previewRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => previewRef.current,
    documentTitle: cvData.personalInfo.name ? `${cvData.personalInfo.name}-CV` : 'cv',
    removeAfterPrint: true
  })

  // PDF çıktısı (A4, tıklanabilir linklerle, yüksek kalite)
  const handleExportPDF = async () => {
    const input = previewRef.current;
    // Geçici olarak min-height'ı kaldır
    const prevMinHeight = input.style.minHeight;
    input.style.minHeight = '';
    const opt = {
      margin: 0,
      filename: (cvData.personalInfo.name || 'cv') + '.pdf',
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { scale: 3, useCORS: true },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all'] }
    };
    await html2pdf().set(opt).from(input).save();
    // Eski min-height'ı geri yükle
    input.style.minHeight = prevMinHeight;
  }

  // PNG çıktısı (A4 oranında, yüksek kalite)
  const handleExportPNG = async () => {
    const input = previewRef.current
    const canvas = await html2canvas(input, { scale: 3, useCORS: true })
    const imgData = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = imgData
    link.download = (cvData.personalInfo.name || 'cv') + '.png'
    link.click()
  }

  // Dışa Aktar menüsü için state
  const [exportMenuOpen, setExportMenuOpen] = useState(false)

  const updatePersonalInfo = (field, value) => {
    setCvData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }))
  }

  const addEducation = () => {
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, {
        id: Date.now(),
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: '',
        description: '',
        location: '',
        startDateFormat: 'month-year',
        endDateFormat: 'month-year'
      }]
    }))
  }

  const updateEducation = (id, field, value) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }))
  }

  const removeEducation = (id) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }))
  }

  const addExperience = () => {
    setCvData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: Date.now(),
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        achievements: [],
        location: '',
        technologies: '',
        startDateFormat: 'month-year',
        endDateFormat: 'month-year'
      }]
    }))
  }

  const updateExperience = (id, field, value) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const removeExperience = (id) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }))
  }

  const addSkill = () => {
    setCvData(prev => ({
      ...prev,
      skills: [...prev.skills, {
        id: Date.now(),
        name: '',
        level: 'Intermediate',
        category: 'Technical'
      }]
    }))
  }

  const updateSkill = (id, field, value) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }))
  }

  const removeSkill = (id) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }))
  }

  // Türkçe büyük harf dönüşümü fonksiyonu
  function toTurkishUpper(str) {
    return str
      .replace(/i/g, 'İ')
      .replace(/ı/g, 'I')
      .replace(/ş/g, 'Ş')
      .replace(/ğ/g, 'Ğ')
      .replace(/ü/g, 'Ü')
      .replace(/ö/g, 'Ö')
      .replace(/ç/g, 'Ç')
      .toUpperCase();
  }

  // Diller formu (isim + seviye)
  const addLanguage = () => {
    setCvData(prev => ({
      ...prev,
      languages: [...prev.languages, { name: '', level: '' }]
    }))
  }
  const updateLanguage = (idx, name, level) => {
    setCvData(prev => ({
      ...prev,
      languages: prev.languages.map((lang, i) => i === idx ? { ...lang, name, level } : lang)
    }))
  }
  const removeLanguage = (idx) => {
    setCvData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== idx)
    }))
  }

  return (
    <div className="cv-builder">
      <div className="cv-container">
        <div className="cv-editor">
          {/* CV Dili Seçici */}
          <section className="cv-section">
            <h2>CV Dili / CV Language</h2>
            <div className="form-group">
              <label>Dil Seçimi / Language Selection:</label>
              <select
                value={cvData.cvLanguage}
                onChange={(e) => updateCVLanguage(e.target.value)}
              >
                <option value="tr">Türkçe</option>
                <option value="en">English</option>
              </select>
            </div>
          </section>

          <section className="cv-section">
            <h2>{getTitle('personalInfo')}</h2>
            {/* Profil Fotoğrafı Yükleme Alanı */}
            <div className="form-group">
              <label>{cvData.cvLanguage === 'tr' ? 'Profil Fotoğrafı' : 'Profile Image'}:</label>
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      updatePersonalInfo('profileImage', reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {cvData.personalInfo.profileImage && (
                <div style={{ marginTop: 8 }}>
                  <img src={cvData.personalInfo.profileImage} alt="profile preview" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, border: '1px solid #ccc' }} />
                </div>
              )}
            </div>
            <div className="form-group">
              <label>{cvData.cvLanguage === 'tr' ? 'Yaş' : 'Age'}:</label>
              <input
                type="number"
                value={cvData.personalInfo.age}
                onChange={(e) => updatePersonalInfo('age', e.target.value)}
                placeholder={cvData.cvLanguage === 'tr' ? 'Örn: 25' : 'e.g. 25'}
              />
            </div>
            <div className="form-group">
              <label>{cvData.cvLanguage === 'tr' ? 'Adres' : 'Address'}:</label>
              <input
                type="text"
                value={cvData.personalInfo.address}
                onChange={(e) => updatePersonalInfo('address', e.target.value)}
                placeholder={cvData.cvLanguage === 'tr' ? 'Adresiniz (isteğe bağlı)' : 'Your address (optional)'}
              />
            </div>
            <div className="form-group">
              <label>{getTitle('name')}:</label>
              <input
                type="text"
                value={cvData.personalInfo.name}
                onChange={(e) => updatePersonalInfo('name', e.target.value)}
                placeholder={cvData.cvLanguage === 'tr' ? "Adınız ve soyadınız" : "Your full name"}
              />
            </div>
            <div className="form-group">
              <label>{getTitle('title')}:</label>
              <input
                type="text"
                value={cvData.personalInfo.title}
                onChange={(e) => updatePersonalInfo('title', e.target.value)}
                placeholder={cvData.cvLanguage === 'tr' ? "Örn: Yazılım Geliştirici, Elektrik-Elektronik Mühendisi" : "e.g. Software Developer, Electrical-Electronics Engineer"}
              />
            </div>
            <div className="form-group">
              <label>{getTitle('email')}:</label>
              <input
                type="email"
                value={cvData.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                placeholder="example@email.com"
              />
            </div>
            <div className="form-group">
              <label>{getTitle('phone')}:</label>
              <input
                type="tel"
                value={cvData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                placeholder={cvData.cvLanguage === 'tr' ? "+90 555 123 45 67" : "+1 555 123 4567"}
              />
            </div>
            <div className="form-group">
              <label>{getTitle('linkedin')}:</label>
              <input
                type="url"
                value={cvData.personalInfo.linkedin}
                onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div className="form-group">
              <label>{getTitle('github')}:</label>
              <input
                type="url"
                value={cvData.personalInfo.github}
                onChange={(e) => updatePersonalInfo('github', e.target.value)}
                placeholder="https://github.com/username"
              />
            </div>
            <div className="form-group">
              <label>{getTitle('militaryStatus')}:</label>
              <select
                value={cvData.personalInfo.militaryStatus}
                onChange={(e) => updatePersonalInfo('militaryStatus', e.target.value)}
              >
                <option value="">{getTitle('selectOption')}</option>
                <option value={cvData.cvLanguage === 'tr' ? "Yapıldı" : "Completed"}>{getTitle('militaryOptions').done}</option>
                <option value={cvData.cvLanguage === 'tr' ? "Yapılmıyor" : "Not Required"}>{getTitle('militaryOptions').notRequired}</option>
                <option value={cvData.cvLanguage === 'tr' ? "Yapılmayacak" : "Not Applicable"}>{getTitle('militaryOptions').notApplicable}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{getTitle('drivingLicense')}:</label>
              <select
                value={cvData.personalInfo.drivingLicense}
                onChange={(e) => updatePersonalInfo('drivingLicense', e.target.value)}
              >
                <option value="">{getTitle('selectOption')}</option>
                <option value="A">{getTitle('drivingOptions').A}</option>
                <option value="B">{getTitle('drivingOptions').B}</option>
                <option value="C">{getTitle('drivingOptions').C}</option>
                <option value="D">{getTitle('drivingOptions').D}</option>
                <option value="E">{getTitle('drivingOptions').E}</option>
                <option value="F">{getTitle('drivingOptions').F}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{getTitle('professionalSummary')}:</label>
              <textarea
                value={cvData.personalInfo.summary}
                onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                placeholder={cvData.cvLanguage === 'tr' ? "3-4 cümlelik profesyonel özetiniz. Anahtar kelimeleri kullanın." : "3-4 sentence professional summary. Use keywords."}
                rows="4"
              />
            </div>
          </section>

          <section className="cv-section">
            <div className="section-header">
              <h2>{getTitle('education')}</h2>
              <button onClick={addEducation} className="add-btn">{getTitle('addEducation')}</button>
            </div>
            {cvData.education.map((edu, index) => (
              <div key={edu.id} className="education-item">
                <div className="item-header">
                  <h3>{getTitle('educationItem')} #{index + 1}</h3>
                  <button onClick={() => removeEducation(edu.id)} className="remove-btn">{getTitle('delete')}</button>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>{getTitle('institution')}:</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      placeholder={cvData.cvLanguage === 'tr' ? "Üniversite/Kurum adı" : "University/Institution name"}
                    />
                  </div>
                  <div className="form-group">
                    <label>{getTitle('degree')}:</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      placeholder={cvData.cvLanguage === 'tr' ? "Lisans, Yüksek Lisans, vb." : "Bachelor's, Master's, etc."}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>{getTitle('field')}:</label>
                    <input
                      type="text"
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                      placeholder={cvData.cvLanguage === 'tr' ? "Bilgisayar Mühendisliği" : "Computer Engineering"}
                    />
                  </div>
                  <div className="form-group">
                    <label>{getTitle('location')}:</label>
                    <input
                      type="text"
                      value={edu.location}
                      onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                      placeholder={cvData.cvLanguage === 'tr' ? "İstanbul, Türkiye" : "Istanbul, Turkey"}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>{getTitle('startDate')}:</label>
                    <input
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    />
                    <div style={{ marginTop: '4px', fontSize: '0.8rem' }}>
                      <label style={{ marginRight: '8px', fontSize: '0.75rem' }}>
                        <input
                          type="radio"
                          name={`startFormat-${edu.id}`}
                          checked={edu.startDateFormat === 'month-year'}
                          onChange={() => updateDateFormat('education', edu.id, 'startDate', 'month-year')}
                          style={{ marginRight: '4px' }}
                        />
                        {cvData.cvLanguage === 'tr' ? 'Ay.Yıl (07.2011)' : 'Month.Year (07.2011)'}
                      </label>
                      <label style={{ fontSize: '0.75rem' }}>
                        <input
                          type="radio"
                          name={`startFormat-${edu.id}`}
                          checked={edu.startDateFormat === 'year-only'}
                          onChange={() => updateDateFormat('education', edu.id, 'startDate', 'year-only')}
                          style={{ marginRight: '4px' }}
                        />
                        {cvData.cvLanguage === 'tr' ? 'Sadece Yıl (2011)' : 'Year Only (2011)'}
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>{getTitle('endDate')}:</label>
                    <input
                      type="month"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                      disabled={edu.current}
                    />
                    <div style={{ marginTop: '4px', fontSize: '0.8rem' }}>
                      <label style={{ marginRight: '8px', fontSize: '0.75rem' }}>
                        <input
                          type="radio"
                          name={`endFormat-${edu.id}`}
                          checked={edu.endDateFormat === 'month-year'}
                          onChange={() => updateDateFormat('education', edu.id, 'endDate', 'month-year')}
                          style={{ marginRight: '4px' }}
                        />
                        {cvData.cvLanguage === 'tr' ? 'Ay.Yıl (07.2011)' : 'Month.Year (07.2011)'}
                      </label>
                      <label style={{ fontSize: '0.75rem' }}>
                        <input
                          type="radio"
                          name={`endFormat-${edu.id}`}
                          checked={edu.endDateFormat === 'year-only'}
                          onChange={() => updateDateFormat('education', edu.id, 'endDate', 'year-only')}
                          style={{ marginRight: '4px' }}
                        />
                        {cvData.cvLanguage === 'tr' ? 'Sadece Yıl (2011)' : 'Year Only (2011)'}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>{getTitle('gpa')}:</label>
                  <input
                    type="text"
                    value={edu.gpa}
                    onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                    placeholder="3.85/4.00"
                  />
                </div>
                <div className="form-group">
                  <label>{getTitle('description')}:</label>
                  <textarea
                    value={edu.description}
                    onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                    placeholder={cvData.cvLanguage === 'tr' ? "Eğitim sürecinde elde ettiğiniz başarılar, projeler..." : "Achievements, projects during your education..."}
                    rows="3"
                  />
                </div>
              </div>
            ))}
          </section>

          <section className="cv-section">
            <div className="section-header">
              <h2>{getTitle('experience')}</h2>
              <button onClick={addExperience} className="add-btn">{getTitle('addExperience')}</button>
            </div>
            {cvData.experience.map((exp, index) => (
              <div key={exp.id} className="experience-item">
                <div className="item-header">
                  <h3>{getTitle('experienceItem')} #{index + 1}</h3>
                  <button onClick={() => removeExperience(exp.id)} className="remove-btn">{getTitle('delete')}</button>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>{getTitle('company')}:</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      placeholder={cvData.cvLanguage === 'tr' ? "Şirket adı" : "Company name"}
                    />
                  </div>
                  <div className="form-group">
                    <label>{getTitle('position')}:</label>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                      placeholder={cvData.cvLanguage === 'tr' ? "Yazılım Geliştirici" : "Software Developer"}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>{getTitle('location')}:</label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                      placeholder={cvData.cvLanguage === 'tr' ? "İstanbul, Türkiye" : "Istanbul, Turkey"}
                    />
                  </div>
                  <div className="form-group">
                    <label>{getTitle('technologies')}:</label>
                    <input
                      type="text"
                      value={exp.technologies}
                      onChange={(e) => updateExperience(exp.id, 'technologies', e.target.value)}
                      placeholder="React, Node.js, Python, AWS"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>{getTitle('startDate')}:</label>
                    <input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    />
                    <div style={{ marginTop: '4px', fontSize: '0.8rem' }}>
                      <label style={{ marginRight: '8px', fontSize: '0.75rem' }}>
                        <input
                          type="radio"
                          name={`expStartFormat-${exp.id}`}
                          checked={exp.startDateFormat === 'month-year'}
                          onChange={() => updateDateFormat('experience', exp.id, 'startDate', 'month-year')}
                          style={{ marginRight: '4px' }}
                        />
                        {cvData.cvLanguage === 'tr' ? 'Ay.Yıl (07.2011)' : 'Month.Year (07.2011)'}
                      </label>
                      <label style={{ fontSize: '0.75rem' }}>
                        <input
                          type="radio"
                          name={`expStartFormat-${exp.id}`}
                          checked={exp.startDateFormat === 'year-only'}
                          onChange={() => updateDateFormat('experience', exp.id, 'startDate', 'year-only')}
                          style={{ marginRight: '4px' }}
                        />
                        {cvData.cvLanguage === 'tr' ? 'Sadece Yıl (2011)' : 'Year Only (2011)'}
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>{getTitle('endDate')}:</label>
                    <input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      disabled={exp.current}
                    />
                    <div style={{ marginTop: '4px', fontSize: '0.8rem' }}>
                      <label style={{ marginRight: '8px', fontSize: '0.75rem' }}>
                        <input
                          type="radio"
                          name={`expEndFormat-${exp.id}`}
                          checked={exp.endDateFormat === 'month-year'}
                          onChange={() => updateDateFormat('experience', exp.id, 'endDate', 'month-year')}
                          style={{ marginRight: '4px' }}
                        />
                        {cvData.cvLanguage === 'tr' ? 'Ay.Yıl (07.2011)' : 'Month.Year (07.2011)'}
                      </label>
                      <label style={{ fontSize: '0.75rem' }}>
                        <input
                          type="radio"
                          name={`expEndFormat-${exp.id}`}
                          checked={exp.endDateFormat === 'year-only'}
                          onChange={() => updateDateFormat('experience', exp.id, 'endDate', 'year-only')}
                          style={{ marginRight: '4px' }}
                        />
                        {cvData.cvLanguage === 'tr' ? 'Sadece Yıl (2011)' : 'Year Only (2011)'}
                      </label>
                    </div>
                  </div>
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                      />
                      {getTitle('current')}
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <label>{getTitle('jobDescription')}:</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    placeholder={cvData.cvLanguage === 'tr' ? "Sorumluluklarınız, başarılarınız, projeleriniz... (ATS için anahtar kelimeler kullanın)" : "Your responsibilities, achievements, projects... (Use keywords for ATS)"}
                    rows="4"
                  />
                </div>
              </div>
            ))}
          </section>

          <section className="cv-section">
            <div className="section-header">
              <h2>{getTitle('skills')}</h2>
              <button onClick={addSkill} className="add-btn">{getTitle('addSkill')}</button>
            </div>
            {cvData.skills.map((skill, index) => (
              <div key={skill.id} className="skill-item">
                <div className="item-header">
                  <h3>{getTitle('skillItem')} #{index + 1}</h3>
                  <button onClick={() => removeSkill(skill.id)} className="remove-btn">{getTitle('delete')}</button>
                </div>
                <div className="form-group">
                  <label>{getTitle('skill')}:</label>
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                    placeholder="JavaScript, React, Python..."
                  />
                </div>
              </div>
            ))}
          </section>

          {/* Diller bölümü (isim + seviye) */}
          <section className="cv-section">
            <div className="section-header">
              <h2>{getTitle('languages')}</h2>
              <button onClick={addLanguage} className="add-btn">+ {getTitle('languages')}</button>
            </div>
            {cvData.languages.map((lang, idx) => (
              <div key={idx} className="form-group" style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  value={lang.name}
                  onChange={(e) => updateLanguage(idx, e.target.value, lang.level)}
                  placeholder={cvData.cvLanguage === 'tr' ? 'İngilizce' : 'English'}
                  style={{ flex: 2 }}
                />
                <select
                  value={lang.level || ''}
                  onChange={e => updateLanguage(idx, lang.name, e.target.value)}
                  style={{ flex: 1 }}
                >
                  <option value="">{cvData.cvLanguage === 'tr' ? 'Seviye' : 'Level'}</option>
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                  <option value="C+">C+</option>
                </select>
                <button onClick={() => removeLanguage(idx)} className="remove-btn">{getTitle('delete')}</button>
              </div>
            ))}
          </section>

          {cvData.achievements && cvData.achievements.length > 0 && (
            <div className="preview-section">
              <div className="section-label">{cvData.cvLanguage === 'tr' ? toTurkishUpper(getTitle('achievements')) : getTitle('achievements').toUpperCase()}</div>
              <ul className="achievements-list">
                {cvData.achievements.map((ach, idx) => (
                  <li key={idx}>{ach}</li>
                ))}
              </ul>
            </div>
          )}
          {cvData.references && cvData.references.length > 0 && (
            <div className="preview-section">
              <div className="section-label">{cvData.cvLanguage === 'tr' ? toTurkishUpper(getTitle('references')) : getTitle('references').toUpperCase()}</div>
              <ul className="references-list">
                {cvData.references.map((ref, idx) => (
                  <li key={idx}>{ref}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="cv-preview">
          <div className="cv-preview-header">
            <h2>{cvData.cvLanguage === 'tr' ? 'CV Önizleme' : 'CV Preview'}</h2>
            <div style={{ position: 'relative' }}>
              <button className="add-btn" onClick={() => setExportMenuOpen((v) => !v)}>
                {cvData.cvLanguage === 'tr' ? 'Dışa Aktar' : 'Export'}
              </button>
              {exportMenuOpen && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '110%',
                  background: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  zIndex: 10,
                  minWidth: 120,
                }}>
                  <button className="export-menu-btn" onClick={() => { setExportMenuOpen(false); handleExportPDF(); }}>
                    {cvData.cvLanguage === 'tr' ? 'PDF olarak indir' : 'Download as PDF'}
                  </button>
                  <button className="export-menu-btn" onClick={() => { setExportMenuOpen(false); handleExportPNG(); }}>
                    {cvData.cvLanguage === 'tr' ? 'PNG olarak indir' : 'Download as PNG'}
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="preview-content" ref={previewRef}>
            {/* HEADER (Preview) */}
            {cvData.personalInfo.profileImage ? (
              <div className="preview-header-row" style={{ marginBottom: 0 }}>
                <img
                  src={cvData.personalInfo.profileImage}
                  alt="profile"
                  className="profile-image"
                />
                <div
                  className="preview-header-main"
                  style={{ alignItems: 'flex-start', textAlign: 'left', marginBottom: 0 }}
                >
                  <h1 className="cv-name">{cvData.cvLanguage === 'tr' ? toTurkishUpper(cvData.personalInfo.name || 'Ad Soyad') : (cvData.personalInfo.name || 'Full Name').toUpperCase()}</h1>
                  <div className="cv-title">{cvData.personalInfo.title || (cvData.cvLanguage === 'tr' ? 'Ünvan / Meslek' : 'Title / Position')}</div>
                </div>
              </div>
            ) : (
              <div className="preview-personal" style={{ marginBottom: 0, paddingBottom: 0, borderBottom: 'none' }}>
                <div
                  className="preview-header-main"
                  style={{ alignItems: 'center', textAlign: 'center', width: '100%', marginBottom: 0 }}
                >
                  <h1 className="cv-name">{cvData.cvLanguage === 'tr' ? toTurkishUpper(cvData.personalInfo.name || 'Ad Soyad') : (cvData.personalInfo.name || 'Full Name').toUpperCase()}</h1>
                  <div className="cv-title">{cvData.personalInfo.title || (cvData.cvLanguage === 'tr' ? 'Ünvan / Meslek' : 'Title / Position')}</div>
                </div>
              </div>
            )}
            <div style={{ height: 25 }} />
            {/* 6'lı grid bölgesi */}
            {(cvData.personalInfo.address || cvData.personalInfo.age || cvData.personalInfo.militaryStatus || cvData.personalInfo.phone || cvData.personalInfo.email || cvData.personalInfo.drivingLicense) && (
              <div className="header-grid-6" style={{ marginBottom: 2 }}>
                {/* Sol blok */}
                <div className="header-grid-left">
                  <div className="header-grid-cell">
                    {cvData.personalInfo.address && <span>{cvData.personalInfo.address}</span>}
                  </div>
                  <div className="header-grid-cell">
                    {cvData.personalInfo.age && <span>{cvData.cvLanguage === 'tr' ? 'Yaş: ' : 'Age: '}{cvData.personalInfo.age}</span>}
                  </div>
                  <div className="header-grid-cell">
                    {cvData.personalInfo.militaryStatus && <span>{cvData.cvLanguage === 'tr' ? 'Askerlik Durumu: ' : 'Military Status: '}{cvData.personalInfo.militaryStatus}</span>}
                  </div>
                </div>
                {/* Sağ blok */}
                <div className="header-grid-right">
                  <div className="header-grid-cell">
                    {cvData.personalInfo.phone && <span>{cvData.personalInfo.phone}</span>}
                  </div>
                  <div className="header-grid-cell">
                    {cvData.personalInfo.email && <a href={`mailto:${cvData.personalInfo.email}`} className="preview-link">{cvData.personalInfo.email}</a>}
                  </div>
                  <div className="header-grid-cell">
                    {cvData.personalInfo.drivingLicense && <span>{cvData.cvLanguage === 'tr' ? 'Ehliyet Sınıfı: ' : 'License: '}{cvData.personalInfo.drivingLicense}</span>}
                  </div>
                </div>
              </div>
            )}
            <div style={{ height: 25 }} />
            {(cvData.personalInfo.linkedin || cvData.personalInfo.github) && (
              <div className="preview-section social-links">
                <div className="section-label">{cvData.cvLanguage === 'tr' ? toTurkishUpper(getTitle('websitesAndSocialLinks')) : getTitle('websitesAndSocialLinks').toUpperCase()}</div>
                <div className="social-row" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
                  {cvData.personalInfo.linkedin && (
                    <span>LinkedIn: <a className="preview-link" href={cvData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer">{cvData.personalInfo.linkedin}</a></span>
                  )}
                  {cvData.personalInfo.github && (
                    <span>GitHub: <a className="preview-link" href={cvData.personalInfo.github} target="_blank" rel="noopener noreferrer">{cvData.personalInfo.github}</a></span>
                  )}
                </div>
              </div>
            )}

            {cvData.personalInfo.summary && (
              <div className="preview-section summary-section">
                <div className="section-label">{cvData.cvLanguage === 'tr' ? toTurkishUpper(getTitle('summary')) : getTitle('summary').toUpperCase()}</div>
                <p>{cvData.personalInfo.summary}</p>
              </div>
            )}

            {cvData.experience.length > 0 && (
              <div className="preview-section">
                <div className="section-label">{cvData.cvLanguage === 'tr' ? toTurkishUpper(getTitle('experience')) : getTitle('experience').toUpperCase()}</div>
                <div className="edu-exp-list">
                  {cvData.experience.map((exp, index) => (
                    <div key={exp.id} className="edu-exp-item">
                      <div className="edu-exp-date">
                        {formatDateRange(exp.startDate, exp.endDate, exp.startDateFormat, exp.endDateFormat)}
                      </div>
                      <div className="edu-exp-content">
                        <h3>{exp.position || (cvData.cvLanguage === 'tr' ? 'Pozisyon' : 'Position')}</h3>
                        <div className="edu-exp-org">{exp.company || (cvData.cvLanguage === 'tr' ? 'Şirket' : 'Company')}{exp.location ? `, ${exp.location}` : ''}</div>
                        {exp.technologies && <div className="edu-exp-desc"><strong>{getTitle('technologies')}:</strong> {exp.technologies}</div>}
                        {exp.description && <div className="edu-exp-desc">{exp.description}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {cvData.education.length > 0 && (
              <div className="preview-section">
                <div className="section-label">{cvData.cvLanguage === 'tr' ? toTurkishUpper(getTitle('education')) : getTitle('education').toUpperCase()}</div>
                <div className="edu-exp-list">
                  {cvData.education.map((edu, index) => (
                    <div key={edu.id} className="edu-exp-item">
                      <div className="edu-exp-date">
                        {formatDateRange(edu.startDate, edu.endDate, edu.startDateFormat, edu.endDateFormat)}
                      </div>
                      <div className="edu-exp-content">
                        <h3>{edu.degree}{edu.field ? (cvData.cvLanguage === 'tr' ? `,${edu.field}` : ` in ${edu.field}`) : ''}</h3>
                        <div className="edu-exp-org">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</div>
                        {edu.gpa && <div className="edu-exp-desc">GPA: {edu.gpa}</div>}
                        {edu.description && <div className="edu-exp-desc">{edu.description}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {cvData.skills.length > 0 && (
              <div className="preview-section">
                <div className="section-label">{cvData.cvLanguage === 'tr' ? toTurkishUpper(getTitle('skills')) : getTitle('skills').toUpperCase()}</div>
                <div className="skills-list">
                  {cvData.skills.map((skill, index) => (
                    <span key={skill.id} className="skill-tag">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {/* Diller bölümü (isim + seviye) */}
            {cvData.languages && cvData.languages.length > 0 && (
              <div className="preview-section">
                <div className="section-label">{cvData.cvLanguage === 'tr' ? toTurkishUpper(getTitle('languages')) : getTitle('languages').toUpperCase()}</div>
                <div className="languages-list">
                  {cvData.languages.map((lang, idx) => (
                    <span key={idx} className="language-tag">{lang.name}{lang.level ? ` (${lang.level})` : ''}</span>
                  ))}
                </div>
              </div>
            )}
            {cvData.achievements && cvData.achievements.length > 0 && (
              <div className="preview-section">
                <div className="section-label">{cvData.cvLanguage === 'tr' ? toTurkishUpper(getTitle('achievements')) : getTitle('achievements').toUpperCase()}</div>
                <ul className="achievements-list">
                  {cvData.achievements.map((ach, idx) => (
                    <li key={idx}>{ach}</li>
                  ))}
                </ul>
              </div>
            )}
            {cvData.references && cvData.references.length > 0 && (
              <div className="preview-section">
                <div className="section-label">{cvData.cvLanguage === 'tr' ? toTurkishUpper(getTitle('references')) : getTitle('references').toUpperCase()}</div>
                <ul className="references-list">
                  {cvData.references.map((ref, idx) => (
                    <li key={idx}>{ref}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
