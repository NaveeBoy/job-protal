export const analyze = (text) => {
    if (text.toLowerCase().includes('contact')) {
      return 'The contact number is 0768322692.';
    } else if (text.toLowerCase().includes('email')) {
      return 'The email address is quickjobs@gmail.com.';
    } else if (text.toLowerCase().includes('software/db/qa/web/graphics/gis')) {
      return 'Expertise in software development, databases, quality assurance, web design, graphics, and geographic information systems.';
    }else if (text.toLowerCase().includes('accounting/auditing/finance')) {
      return 'Proficient in accounting, financial auditing, and managing financial operations.';
    }else if (text.toLowerCase().includes('banking & finance/insurance')) {
      return 'Knowledgeable in banking, finance management, and insurance services.';
    }else if (text.toLowerCase().includes('hardware/networks/systems')) {
      return 'Specializes in hardware, network setup, and systems management for efficient IT infrastructure.';
    }else if (text.toLowerCase().includes('sales/marketing/merchandising')) {
      return 'Skilled in sales strategies, marketing campaigns, and product merchandising.';
    }else if (text.toLowerCase().includes('civil eng/interior design/Architecture')) {
      return ' Expertise in civil engineering, interior design,and architectural planning';
    }else if (text.toLowerCase().includes('address')) {
      return 'The address is QuickJob\' s Server!';
    } else if (text.toLowerCase().includes('categories')) {
      return {
        message: 'Here are the job categories:',
        options: [
          'Software/DB/QA/Web/Graphics/GIS',
          'Hardware/Networks/Systems',
          'Accounting/Auditing/Finance',
          'Banking & Finance/Insurance',
          'Sales/Marketing/Merchandising'
          
        ]
      };
    } else if (text.toLowerCase().includes('hi') || text.toLowerCase().includes('hello')) {
      return 'Hello!';
    }else if (text.toLowerCase().includes('how are you') || text.toLowerCase().includes('how about you')) {
      return 'I\'m doing well, thank you! How about you?';
    } else if (text.toLowerCase().includes('fine') || text.toLowerCase().includes('well') || text.toLowerCase().includes('good')) {
      return 'Glad to hear that! ';
    }else if (text.toLowerCase().includes('how are you') || text.toLowerCase().includes('who') || text.toLowerCase().includes('name') || text.toLowerCase().includes('what is your name')) {
      return 'i\'m chat bot in QuickJobs!';
    }else if (text.toLowerCase().includes('when you born') || text.toLowerCase().includes('birthday') || text.toLowerCase().includes('birth') || text.toLowerCase().includes('what is your name') || text.toLowerCase().includes('dob')) {
      return 'As an AI, I don\'t have a birthday, but I\'m here to help you anytime!';
    }else if (text.toLowerCase().includes('country') || text.toLowerCase().includes('from') ||  text.toLowerCase().includes('live')) {
      return 'My country is Sri Lanka';
    }else if (text.toLowerCase().includes('jobs') || text.toLowerCase().includes('how many jobs') ||  text.toLowerCase().includes('job count')) {
      return 'QuickJobs have more than 1000+';
    }
    
    return 'I didn\'t get your question';
  };
  