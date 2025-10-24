// AI Interactions and CV Processing
class AIInteractions {
    constructor() {
        this.apiBase = '/api/v1';
        this.cvAnalysisResults = null;
    }

    async analyzeCV(cvFile) {
        const formData = new FormData();
        formData.append('cv', cvFile);

        try {
            const response = await fetch(`${this.apiBase}/analyze-cv`, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            
            if (result.success) {
                this.cvAnalysisResults = result.data;
                this.displayCVAnalysis(result.data);
                return result.data;
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('CV Analysis Error:', error);
            this.showError('Failed to analyze CV. Please try again.');
            return null;
        }
    }

    displayCVAnalysis(analysis) {
        const analysisHTML = `
            <div class="cv-analysis-results">
                <h3>AI CV Analysis Results</h3>
                <div class="score-section">
                    <div class="overall-score">
                        <div class="score-circle" style="--score: ${analysis.overall_score}">
                            <span>${analysis.overall_score}%</span>
                        </div>
                        <p>Overall Optimization Score</p>
                    </div>
                </div>
                
                <div class="improvement-areas">
                    <h4>Key Improvement Areas</h4>
                    ${analysis.improvements.map(imp => `
                        <div class="improvement-item">
                            <i class="fas fa-${imp.priority === 'high' ? 'exclamation-triangle' : 'info-circle'} ${imp.priority}"></i>
                            <span>${imp.message}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="keyword-analysis">
                    <h4>Keyword Optimization</h4>
                    <div class="keywords">
                        ${analysis.keywords.map(keyword => `
                            <span class="keyword-tag ${keyword.matched ? 'matched' : 'missing'}">
                                ${keyword.word} ${keyword.matched ? '✓' : '✗'}
                            </span>
                        `).join('')}
                    </div>
                </div>
                
                <button class="btn btn-primary" onclick="aiInteractions.optimizeCV()">
                    <i class="fas fa-magic"></i>
                    Auto-Optimize CV
                </button>
            </div>
        `;

        this.showModal('CV Analysis Results', analysisHTML);
    }

    async optimizeCV() {
        if (!this.cvAnalysisResults) {
            this.showError('Please analyze your CV first.');
            return;
        }

        this.showLoading('AI is optimizing your CV...');

        try {
            const response = await fetch(`${this.apiBase}/optimize-cv`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    original_analysis: this.cvAnalysisResults,
                    target_industry: document.getElementById('targetIndustry')?.value,
                    experience_level: document.getElementById('experienceLevel')?.value
                })
            });

            const result = await response.json();
            
            if (result.success) {
                this.displayOptimizedCV(result.data);
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('CV Optimization Error:', error);
            this.showError('Failed to optimize CV. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    displayOptimizedCV(optimizedData) {
        const optimizedHTML = `
            <div class="optimized-cv">
                <h3>AI-Optimized CV Ready! 🎉</h3>
                
                <div class="improvement-stats">
                    <div class="stat">
                        <span class="number">+${optimizedData.improvement_score}%</span>
                        <span>Improvement</span>
                    </div>
                    <div class="stat">
                        <span class="number">${optimizedData.ats_score}/100</span>
                        <span>ATS Score</span>
                    </div>
                    <div class="stat">
                        <span class="number">${optimizedData.readability_score}/100</span>
                        <span>Readability</span>
                    </div>
                </div>
                
                <div class="cv-preview">
                    <h4>Preview</h4>
                    <div class="preview-content">
                        ${optimizedData.preview}
                    </div>
                </div>
                
                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="aiInteractions.downloadCV()">
                        <i class="fas fa-download"></i>
                        Download Optimized CV
                    </button>
                    <button class="btn btn-secondary" onclick="aiInteractions.applyWithCV()">
                        <i class="fas fa-paper-plane"></i>
                        Apply to Matching Jobs
                    </button>
                </div>
            </div>
        `;

        this.showModal('Optimized CV Ready', optimizedHTML);
    }

    async generateCoverLetter(jobDescription, cvData) {
        this.showLoading('AI is generating your cover letter...');

        try {
            const response = await fetch(`${this.apiBase}/generate-cover-letter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    job_description: jobDescription,
                    cv_data: cvData,
                    tone: 'professional', // professional, enthusiastic, formal
                    length: 'medium' // short, medium, long
                })
            });

            const result = await response.json();
            
            if (result.success) {
                this.displayCoverLetter(result.data);
                return result.data;
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Cover Letter Generation Error:', error);
            this.showError('Failed to generate cover letter. Please try again.');
            return null;
        } finally {
            this.hideLoading();
        }
    }

    displayCoverLetter(coverLetterData) {
        const coverLetterHTML = `
            <div class="cover-letter-result">
                <h3>AI-Generated Cover Letter ✨</h3>
                
                <div class="quality-metrics">
                    <span class="metric">
                        <i class="fas fa-bullseye"></i>
                        Relevance: ${coverLetterData.relevance_score}%
                    </span>
                    <span class="metric">
                        <i class="fas fa-magic"></i>
                        Personalization: ${coverLetterData.personalization_score}%
                    </span>
                </div>
                
                <div class="cover-letter-content">
                    <textarea readonly>${coverLetterData.content}</textarea>
                </div>
                
                <div class="cover-letter-actions">
                    <button class="btn btn-primary" onclick="aiInteractions.downloadCoverLetter()">
                        <i class="fas fa-download"></i>
                        Download as PDF
                    </button>
                    <button class="btn btn-secondary" onclick="aiInteractions.regenerateCoverLetter()">
                        <i class="fas fa-sync"></i>
                        Regenerate
                    </button>
                    <button class="btn btn-success" onclick="aiInteractions.useCoverLetter()">
                        <i class="fas fa-check"></i>
                        Use This Letter
                    </button>
                </div>
            </div>
        `;

        this.showModal('Cover Letter Generated', coverLetterHTML);
    }

    async scanJobOpportunities(userProfile) {
        this.showLoading('Scanning for perfect job matches...');

        try {
            const response = await fetch(`${this.apiBase}/scan-jobs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    skills: userProfile.skills,
                    experience: userProfile.experience,
                    location: userProfile.location,
                    salary_expectation: userProfile.salary_expectation,
                    industry: userProfile.industry
                })
            });

            const result = await response.json();
            
            if (result.success) {
                this.displayJobMatches(result.data);
                return result.data;
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Job Scan Error:', error);
            this.showError('Failed to scan job opportunities. Please try again.');
            return null;
        } finally {
            this.hideLoading();
        }
    }

    displayJobMatches(jobMatches) {
        const matchesHTML = `
            <div class="job-matches">
                <h3>Perfect Job Matches Found! 🎯</h3>
                <p>We found ${jobMatches.length} jobs that match your profile</p>
                
                <div class="matches-grid">
                    ${jobMatches.map(job => `
                        <div class="job-match-card">
                            <div class="match-score">
                                <div class="score-badge">${job.match_score}%</div>
                            </div>
                            <h4>${job.title}</h4>
                            <p class="company">${job.company}</p>
                            <p class="location">📍 ${job.location}</p>
                            <p class="salary">💰 ${job.salary}</p>
                            <div class="match-reasons">
                                ${job.match_reasons.slice(0, 3).map(reason => 
                                    `<span class="reason-tag">${reason}</span>`
                                ).join('')}
                            </div>
                            <button class="btn btn-primary btn-small" onclick="aiInteractions.applyToJobMatch('${job.id}')">
                                Quick Apply
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.showModal('Job Matches', matchesHTML);
    }

    // Utility functions
    showModal(title, content) {
        const modalHTML = `
            <div class="ai-modal" id="aiModal">
                <div class="ai-modal-content">
                    <div class="ai-modal-header">
                        <h2>${title}</h2>
                        <span class="ai-close" onclick="this.closest('.ai-modal').remove()">&times;</span>
                    </div>
                    <div class="ai-modal-body">
                        ${content}
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    showLoading(message = 'Processing...') {
        const loadingHTML = `
            <div class="ai-loading" id="aiLoading">
                <div class="loading-spinner"></div>
                <p>${message}</p>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', loadingHTML);
    }

    hideLoading() {
        const loading = document.getElementById('aiLoading');
        if (loading) {
            loading.remove();
        }
    }

    showError(message) {
        const errorHTML = `
            <div class="ai-error">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.remove()">&times;</button>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', errorHTML);
        
        setTimeout(() => {
            const error = document.querySelector('.ai-error');
            if (error) error.remove();
        }, 5000);
    }
}

// Initialize AI Interactions
const aiInteractions = new AIInteractions();

// CV Upload Handler
document.addEventListener('DOMContentLoaded', function() {
    const cvUpload = document.getElementById('cvUpload');
    if (cvUpload) {
        cvUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                if (file.type === 'application/pdf' || file.type === 'application/msword' || 
                    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                    aiInteractions.analyzeCV(file);
                } else {
                    aiInteractions.showError('Please upload a PDF or Word document.');
                }
            }
        });
    }
});
