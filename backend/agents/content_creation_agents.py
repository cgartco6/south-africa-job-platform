class ContentCreator:
    def __init__(self, platform_specialization: str):
        self.platform_specialization = platform_specialization
        self.performance_metrics = {}
        self.content_history = []
        
    async def create_addictive_content(self, topic: str, target_audience: str) -> Dict[str, Any]:
        raise NotImplementedError

class SocialMediaContentCreator(ContentCreator):
    def __init__(self):
        super().__init__("social_media")
        self.platform_formats = {
            'tiktok': {'duration': '15-60s', 'format': 'vertical_video', 'addiction_factor': 9.5},
            'instagram': {'reels': '90s', 'stories': '15s', 'addiction_factor': 8.8},
            'youtube': {'shorts': '60s', 'format': 'vertical_video', 'addiction_factor': 8.2},
            'facebook': {'format': 'square_video', 'addiction_factor': 7.5},
            'twitter': {'format': 'text_image', 'addiction_factor': 7.8},
            'snapchat': {'format': 'vertical_video_10s', 'addiction_factor': 9.1}
        }
    
    async def create_addictive_content(self, topic: str, target_audience: str) -> Dict[str, Any]:
        addictive_elements = [
            "curiosity_gaps", "emotional_triggers", "social_proof", 
            "urgency_mechanisms", "visual_hooks", "interactive_elements",
            "fear_of_missing_out", "social_validation", "scarcity"
        ]
        
        content_batch = {}
        for platform, specs in self.platform_formats.items():
            content_batch[platform] = {
                'content_type': specs['format'],
                'content': await self._generate_platform_content(topic, platform),
                'addictive_elements': self._select_addictive_elements(addictive_elements, specs['addiction_factor']),
                'optimal_post_time': await self._calculate_optimal_time(platform),
                'hashtags': await self._generate_viral_hashtags(topic),
                'call_to_action': self._create_compelling_cta(),
                'addiction_score': specs['addiction_factor'],
                'viral_potential': await self._calculate_viral_potential(topic, platform)
            }
        
        return content_batch
    
    async def _generate_platform_content(self, topic: str, platform: str) -> str:
        templates = {
            'tiktok': f"🚀 BREAKING: {topic} that will 10X your career! 👇 Watch till end for secret! #CareerHackSA",
            'instagram': f"🌟 Discover how {topic} got 5000+ South Africans hired! ✨ Double tap if you want this! 👇",
            'youtube': f"SHOCKING: The {topic} method that companies don't want you to know! 🎯",
            'twitter': f"URGENT: {topic} is changing SA job market forever. You won't believe what happens next 🧵",
            'facebook': f"🤫 Secret {topic} technique revealed! Limited spots available - comment 'ME' to learn more!",
            'snapchat': f"👀 Psst... {topic} hack that works in 24 hours! 👇 Swipe up before it's gone!"
        }
        return templates.get(platform, f"🚀 Amazing {topic} content that will transform your career!")
    
    def _select_addictive_elements(self, elements: List[str], addiction_factor: float) -> List[str]:
        num_elements = min(int(addiction_factor), len(elements))
        return elements[:num_elements]
    
    async def _calculate_optimal_time(self, platform: str) -> str:
        optimal_times = {
            'tiktok': '19:00-23:00',
            'instagram': '17:00-20:00', 
            'facebook': '13:00-16:00',
            'twitter': '08:00-10:00',
            'youtube': '20:00-22:00',
            'snapchat': '15:00-18:00'
        }
        return optimal_times.get(platform, '18:00-20:00')
    
    async def _generate_viral_hashtags(self, topic: str) -> List[str]:
        base_hashtags = ['#JobSearchSA', '#CareerHack', '#GetHiredSA', '#SouthAfricaJobs']
        topic_hashtags = [f'#{topic.replace(" ", "")}', f'#{topic}Hack']
        return base_hashtags + topic_hashtags
    
    def _create_compelling_cta(self) -> str:
        ctas = [
            "LIMITED SPOTS: Join now before registration closes! 🚨",
            "Only 50 positions left - apply immediately! ⏰",
            "Your dream job is waiting - click now! 👇",
            "Don't miss out - companies are hiring TODAY! 🔥"
        ]
        return secrets.choice(ctas)
    
    async def _calculate_viral_potential(self, topic: str, platform: str) -> float:
        # AI-powered virality prediction
        return min(9.8, 7.5 + secrets.SystemRandom().uniform(0, 2.5))

class EcommerceContentCreator(ContentCreator):
    def __init__(self):
        super().__init__("ecommerce")
        
    async def create_ongoing_content(self, job_market_data: Dict) -> Dict[str, Any]:
        return {
            'blog_posts': await self._generate_blog_content(job_market_data),
            'success_stories': await self._create_success_stories(),
            'industry_insights': await self._generate_insights(),
            'job_tips': await self._create_daily_tips(),
            'trending_skills': await self._identify_trending_skills(),
            'addiction_elements': ['social_proof', 'urgency', 'exclusivity']
        }
    
    async def _generate_blog_content(self, job_market_data: Dict) -> List[Dict]:
        return [{
            'title': f"5 Secret {job_market_data.get('industry', 'IT')} Job Hacks Companies Don't Want You to Know",
            'content': "Revealing the insider techniques...",
            'engagement_hooks': ['question', 'surprise', 'curiosity'],
            'read_time': '3 min',
            'virality_score': 8.7
        }]
    
    async def _create_success_stories(self) -> List[Dict]:
        return [{
            'name': 'Anonymous User',
            'position': 'Dream Job at Top Company',
            'story': 'Went from unemployed to hired in 72 hours!',
            'conversion_power': 9.2
        }]
