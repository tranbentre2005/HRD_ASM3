import { Course, AssignmentSubmission, LearnerProgressItem, CertificateItem } from "./types"

export const INITIAL_COURSES: Course[] = [
  {
    id: "course-1",
    title: "Kỹ năng Giao tiếp Thấu cảm và Phản hồi Hiệu quả",
    code: "HRD-102",
    category: "Kỹ năng mềm & Quản trị",
    level: "Trung cấp",
    duration: "6 giờ 30 phút",
    totalLessons: 8,
    completedLessons: 6,
    progress: 75,
    instructorName: "ThS. Hoàng Lê Trâm",
    instructorTitle: "Trưởng bộ phận Đào tạo & Phát triển (Head of L&D)",
    instructorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    description: "Trang bị phương pháp lắng nghe tích cực, mô hình phản hồi SBI (Situation - Behavior - Impact) giúp nâng cao hiệu suất làm việc nhóm và giải quyết mâu thuẫn văn phòng.",
    competencies: ["Giao tiếp thấu cảm", "Mô hình SBI", "Phản hồi xây dựng", "Quản trị cảm xúc"],
    status: "in-progress",
    enrolledLearnersCount: 48,
    averageScore: 91.5,
    modules: [
      {
        id: "mod-1",
        title: "Phần 1: Nguyên lý Lắng nghe Tích cực và Tâm lý Giao tiếp",
        duration: "2 giờ 15 phút",
        lessons: [
          {
            id: "les-1-1",
            title: "1.1 Bức tranh tổng quan về giao tiếp thấu cảm trong tổ chức",
            duration: "25 phút",
            type: "video",
            completed: true,
            content: "Tìm hiểu 4 cấp độ lắng nghe: Lắng nghe phớt lờ, Lắng nghe giả vờ, Lắng nghe chọn lọc và Lắng nghe thấu cảm (Empathic Listening).",
          },
          {
            id: "les-1-2",
            title: "1.2 Nhận diện các rào cản nhận thức và định kiến cá nhân",
            duration: "30 phút",
            type: "reading",
            completed: true,
            content: "Định kiến xác nhận (Confirmation Bias) và hiệu ứng hào quang (Halo Effect) thường xuyên làm sai lệch thông điệp tại nơi làm việc.",
          },
          {
            id: "les-1-3",
            title: "1.3 Trắc nghiệm: Đánh giá cấp độ lắng nghe cá nhân",
            duration: "20 phút",
            type: "quiz",
            completed: true,
            quiz: [
              {
                id: "q-1",
                question: "Cấp độ lắng nghe nào đòi hỏi bạn đặt mình vào góc nhìn của người nói thay vì chuẩn bị câu trả lời?",
                options: [
                  "Lắng nghe chọn lọc",
                  "Lắng nghe thấu cảm",
                  "Lắng nghe chủ động phản biện",
                  "Lắng nghe nội dung chính"
                ],
                correctAnswer: 1,
                explanation: "Lắng nghe thấu cảm (Empathic Listening) tập trung trọn vẹn vào cảm xúc, nhu cầu và thế giới quan của đối phương."
              }
            ]
          }
        ]
      },
      {
        id: "mod-2",
        title: "Phần 2: Mô hình Phản hồi Xây dựng SBI",
        duration: "2 giờ 45 phút",
        lessons: [
          {
            id: "les-2-1",
            title: "2.1 Cấu trúc mô hình SBI: Tình huống - Hành vi - Tác động",
            duration: "35 phút",
            type: "video",
            completed: true,
            content: "Mô hình SBI giúp loại bỏ yếu tố phán xét chủ quan bằng cách mô tả tình huống cụ thể, hành vi quan sát được và tác động khách quan.",
          },
          {
            id: "les-2-2",
            title: "2.2 Kỹ thuật chuyển tiếp và thiết lập cam kết cải thiện",
            duration: "40 phút",
            type: "video",
            completed: true,
            content: "Phương pháp đặt câu hỏi mở (Open-ended coaching questions) để người nhận phản hồi tự đưa ra giải pháp hành động.",
          },
          {
            id: "les-2-3",
            title: "2.3 Kiểm tra tình huống: Ứng dụng mô hình SBI thực tế",
            duration: "25 phút",
            type: "quiz",
            completed: false,
            quiz: [
              {
                id: "q-2",
                question: "Khi đưa ra phản hồi theo mô hình SBI, bước nào giúp tránh tranh cãi về mặt nhận định chủ quan?",
                options: [
                  "Chỉ trích thái độ trước rồi mới nói đến kết quả công việc",
                  "Mô tả hành vi có thể quan sát trực tiếp thay vì gán nhãn tính cách",
                  "So sánh người đó với đồng nghiệp xuất sắc khác trong nhóm",
                  "Đưa ra hình thức xử lý kỷ luật ngay trong câu đầu tiên"
                ],
                correctAnswer: 1,
                explanation: "Mô tả hành vi quan sát được (Behavior) giúp phản hồi mang tính sự thật khách quan, không gây cảm giác bị công kích cá nhân."
              },
              {
                id: "q-3",
                question: "Thành phần 'I' (Impact) trong mô hình SBI mang ý nghĩa gì?",
                options: [
                  "Information: Cung cấp thêm tài liệu hướng dẫn",
                  "Impact: Tác động của hành vi đó đến dự án, khách hàng và đội ngũ",
                  "Instruction: Chỉ thị trực tiếp các việc cần làm tiếp theo",
                  "Improvement: Bắt buộc hoàn thành trong 24 giờ"
                ],
                correctAnswer: 1,
                explanation: "Impact nêu rõ hậu quả hoặc kết quả tích cực mà hành vi đó mang lại cho công việc chung."
              }
            ]
          },
          {
            id: "les-2-4",
            title: "2.4 Bài tập thực hành: Viết bản kịch bản phản hồi cho nhân viên",
            duration: "45 phút",
            type: "assignment",
            completed: false,
            assignment: {
              id: "assign-1",
              title: "Thực hành xây dựng kịch bản phản hồi SBI cho tình huống chậm tiến độ",
              instructions: "Hãy chọn một tình huống thực tế tại phòng ban của bạn (ví dụ: nhân viên trễ hạn nộp báo cáo tuần 2 lần liên tiếp). Viết một kịch bản phản hồi hoàn chỉnh gồm 3 phần: Tình huống (S), Hành vi (B), Tác động (I) và kèm theo 2 câu hỏi mở định hướng giải pháp.",
              rubric: [
                "Xác định rõ bối cảnh cụ thể và thời gian diễn ra (20đ)",
                "Mô tả hành vi quan sát trung thực, không dùng từ phán xét (30đ)",
                "Nêu rõ tác động khách quan đến vận hành dự án (30đ)",
                "Đề xuất 2 câu hỏi mở huấn luyện phù hợp (20đ)"
              ],
              dueDaysText: "Hạn nộp: 23:59 ngày 15/09",
              maxScore: 100
            }
          }
        ]
      }
    ]
  },
  {
    id: "course-2",
    title: "Năng lực Lãnh đạo Chuyển đổi và Quản trị Hiệu suất",
    code: "HRD-204",
    category: "Lãnh đạo & Chiến lược",
    level: "Nâng cao",
    duration: "8 giờ 00 phút",
    totalLessons: 10,
    completedLessons: 10,
    progress: 100,
    instructorName: "TS. Vũ Đình Khang",
    instructorTitle: "Cố vấn Chiến lược Quản trị Nhân tài Cấp cao",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80",
    description: "Khóa học chuyên sâu trang bị khung tư duy lãnh đạo chuyển đổi, kỹ năng trao quyền (empowerment) và xây dựng hệ thống OKRs/KPIs liên kết chiến lược công ty.",
    competencies: ["Lãnh đạo chuyển đổi", "Quản trị OKRs", "Ủy quyền & Trao quyền", "Động lực nội tại"],
    status: "completed",
    enrolledLearnersCount: 32,
    averageScore: 94.0,
    modules: [
      {
        id: "mod-2-1",
        title: "Phần 1: Tư duy Lãnh đạo Thời đại Số",
        duration: "3 giờ 30 phút",
        lessons: [
          {
            id: "les-21-1",
            title: "Khác biệt giữa Quản lý Thực thi và Lãnh đạo Chuyển đổi",
            duration: "40 phút",
            type: "video",
            completed: true,
          }
        ]
      }
    ]
  },
  {
    id: "course-3",
    title: "Ứng dụng AI và Tự động hóa trong Vận hành Nhân sự",
    code: "HRD-305",
    category: "Kỹ thuật số & AI",
    level: "Trung cấp",
    duration: "5 giờ 15 phút",
    totalLessons: 6,
    completedLessons: 2,
    progress: 33,
    instructorName: "Kỹ sư Trần Anh Quân",
    instructorTitle: "Chuyên gia Chuyển đổi số & Tự động hóa Doanh nghiệp",
    instructorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    description: "Học cách ứng dụng các mô hình ngôn ngữ lớn (LLM), xây dựng prompt mẫu cho sàng lọc ứng viên, tạo tài liệu đào tạo nội bộ và phân tích dữ liệu hiệu suất.",
    competencies: ["Kỹ thuật Prompting", "Tự động hóa HR", "Phân tích dữ liệu", "Đạo đức AI"],
    status: "in-progress",
    enrolledLearnersCount: 65,
    averageScore: 88.0,
    modules: [
      {
        id: "mod-3-1",
        title: "Phần 1: Nền tảng Công nghệ AI cho Quản trị Nhân sự",
        duration: "2 giờ 00 phút",
        lessons: [
          {
            id: "les-31-1",
            title: "Bản đồ ứng dụng Trí tuệ Nhân tạo trong vòng đời nhân viên",
            duration: "35 phút",
            type: "video",
            completed: true
          }
        ]
      }
    ]
  },
  {
    id: "course-4",
    title: "Văn hóa Doanh nghiệp và Nâng tầm Trải nghiệm Nhân viên",
    code: "HRD-101",
    category: "Văn hóa & Hội nhập",
    level: "Cơ bản",
    duration: "4 giờ 00 phút",
    totalLessons: 5,
    completedLessons: 0,
    progress: 0,
    instructorName: "ThS. Hoàng Lê Trâm",
    instructorTitle: "Trưởng bộ phận Đào tạo & Phát triển (Head of L&D)",
    instructorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
    description: "Nắm vững các trụ cột giá trị cốt lõi, quy tắc ứng xử chuẩn mực và cách thức mỗi cá nhân đóng góp vào môi trường làm việc hạnh phúc, minh bạch.",
    competencies: ["Giá trị cốt lõi", "Quy tắc ứng xử", "Trải nghiệm nhân viên", "An toàn tâm lý"],
    status: "assigned",
    enrolledLearnersCount: 110,
    averageScore: 92.0,
    modules: []
  }
]

export const INITIAL_SUBMISSIONS: AssignmentSubmission[] = [
  {
    id: "sub-101",
    courseId: "course-1",
    courseTitle: "Kỹ năng Giao tiếp Thấu cảm và Phản hồi Hiệu quả",
    lessonId: "les-2-4",
    lessonTitle: "Bài tập thực hành: Viết bản kịch bản phản hồi cho nhân viên",
    learnerId: "lrn-1",
    learnerName: "Nguyễn Minh Tuấn",
    learnerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    department: "Ban Nhân sự & Tuyển dụng",
    submittedAt: "Hôm qua lúc 16:45",
    content: "Kịch bản phản hồi tình huống Chuyên viên tuyển dụng chậm gửi shortlist ứng viên:\n\n1. Situation (Bối cảnh): 'Chào Hưng, chiều thứ Sáu vừa rồi lúc 15:00 trong buổi họp rà soát vị trí Senior Developer cho dự án FinTech...'\n2. Behavior (Hành vi): '...em chưa gửi được bản danh sách 3 ứng viên rút gọn như kế hoạch cam kết mà không báo trước cho team.'\n3. Impact (Tác động): 'Việc này khiến bộ phận Kỹ thuật phải hoãn lịch phỏng vấn vòng 1 sang tuần sau, gây nguy cơ chậm tiến độ onboard của dự án.'\n4. Coaching Questions: 'Em gặp khó khăn cụ thể nào ở nguồn hồ sơ đợt này? Chúng ta có thể tối ưu khâu nào để đảm bảo mốc thời gian tuần tới?'",
    attachmentName: "Kich_ban_Phan_hoi_SBI_TuanNM.docx",
    status: "pending"
  },
  {
    id: "sub-102",
    courseId: "course-1",
    courseTitle: "Kỹ năng Giao tiếp Thấu cảm và Phản hồi Hiệu quả",
    lessonId: "les-2-4",
    lessonTitle: "Bài tập thực hành: Viết bản kịch bản phản hồi cho nhân viên",
    learnerId: "lrn-2",
    learnerName: "Đỗ Mai Phương",
    learnerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    department: "Phòng Tiếp thị Số (Digital Marketing)",
    submittedAt: "08/09/2026 lúc 10:15",
    content: "Tình huống nhân viên thường xuyên ngắt lời đồng nghiệp trong buổi Brainstorming chiến dịch Q4. Áp dụng mô hình SBI tập trung vào việc tạo không gian an toàn cho các thành viên mới phát biểu ý tưởng.",
    attachmentName: "PhuongDM_Feedback_Scenario.pdf",
    status: "graded",
    score: 95,
    feedback: "Kịch bản rất xuất sắc! Em đã bóc tách rõ hành vi cụ thể mà không làm người nhận phản hồi có tâm lý phòng thủ. Câu hỏi huấn luyện cuối cùng rất tinh tế.",
    gradedBy: "ThS. Hoàng Lê Trâm"
  },
  {
    id: "sub-103",
    courseId: "course-1",
    courseTitle: "Kỹ năng Giao tiếp Thấu cảm và Phản hồi Hiệu quả",
    lessonId: "les-2-4",
    lessonTitle: "Bài tập thực hành: Viết bản kịch bản phản hồi cho nhân viên",
    learnerId: "lrn-3",
    learnerName: "Lê Quang Huy",
    learnerAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    department: "Khối Kỹ thuật & Công nghệ",
    submittedAt: "07/09/2026 lúc 21:30",
    content: "Kịch bản góp ý với Tech Lead về việc phản hồi code review gay gắt trên kênh chat chung thay vì hướng dẫn riêng hoặc ghi chú mang tính giải pháp.",
    attachmentName: "SBI_Feedback_TechTeam_HuyLQ.pdf",
    status: "pending"
  }
]

export const INITIAL_LEARNERS: LearnerProgressItem[] = [
  {
    id: "lrn-1",
    name: "Nguyễn Minh Tuấn",
    email: "tuan.nguyen@enterprise.vn",
    department: "Ban Nhân sự & Tuyển dụng",
    roleTitle: "Chuyên viên Nhân sự Cấp cao",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    coursesEnrolled: 4,
    completedCourses: 2,
    overallProgress: 68,
    lastActive: "15 phút trước",
    status: "on-track",
    scoreAverage: 92.5
  },
  {
    id: "lrn-2",
    name: "Đỗ Mai Phương",
    email: "phuong.do@enterprise.vn",
    department: "Phòng Tiếp thị Số (Marketing)",
    roleTitle: "Trưởng nhóm Nội dung & Thương hiệu",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    coursesEnrolled: 3,
    completedCourses: 3,
    overallProgress: 100,
    lastActive: "2 giờ trước",
    status: "completed",
    scoreAverage: 96.0
  },
  {
    id: "lrn-3",
    name: "Lê Quang Huy",
    email: "huy.le@enterprise.vn",
    department: "Khối Kỹ thuật & Công nghệ",
    roleTitle: "Kỹ sư Phần mềm Chính",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    coursesEnrolled: 4,
    completedCourses: 1,
    overallProgress: 45,
    lastActive: "Hôm qua",
    status: "needs-attention",
    scoreAverage: 81.0
  },
  {
    id: "lrn-4",
    name: "Phạm Thúy Hằng",
    email: "hang.pham@enterprise.vn",
    department: "Phòng Tài chính Kế toán",
    roleTitle: "Chuyên viên Phân tích Chi phí",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    coursesEnrolled: 3,
    completedCourses: 2,
    overallProgress: 78,
    lastActive: "3 ngày trước",
    status: "on-track",
    scoreAverage: 90.0
  },
  {
    id: "lrn-5",
    name: "Bùi Quốc Bảo",
    email: "bao.bui@enterprise.vn",
    department: "Ban Quản trị Sản phẩm (Product)",
    roleTitle: "Quản lý Sản phẩm (Product Manager)",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    coursesEnrolled: 5,
    completedCourses: 4,
    overallProgress: 88,
    lastActive: "4 giờ trước",
    status: "on-track",
    scoreAverage: 93.5
  }
]

export const INITIAL_CERTIFICATES: CertificateItem[] = [
  {
    id: "cert-204",
    courseId: "course-2",
    courseTitle: "Năng lực Lãnh đạo Chuyển đổi và Quản trị Hiệu suất",
    courseCode: "HRD-204",
    issueDate: "28/08/2026",
    credentialId: "CERT-HRD-2026-0892",
    learnerName: "Nguyễn Minh Tuấn",
    instructorName: "TS. Vũ Đình Khang",
    instructorTitle: "Cố vấn Chiến lược Quản trị Nhân tài Cấp cao",
    hours: 8,
    grade: "Xuất sắc (94/100)",
    competencies: ["Lãnh đạo chuyển đổi", "Quản trị OKRs", "Ủy quyền & Trao quyền", "Động lực nội tại"]
  },
  {
    id: "cert-101",
    courseId: "course-prev",
    courseTitle: "Kỹ năng Làm việc Nhóm và Tư duy Giải quyết Vấn đề Phức hợp",
    courseCode: "HRD-098",
    issueDate: "15/06/2026",
    credentialId: "CERT-HRD-2026-0417",
    learnerName: "Nguyễn Minh Tuấn",
    instructorName: "ThS. Hoàng Lê Trâm",
    instructorTitle: "Trưởng bộ phận Đào tạo & Phát triển (Head of L&D)",
    hours: 6,
    grade: "Giỏi (91/100)",
    competencies: ["Tư duy thiết kế", "Hợp tác đa chức năng", "Phân tích nguyên nhân gốc rễ"]
  }
]
