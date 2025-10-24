import json
import asyncio
from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional
from dataclasses import dataclass
from abc import ABC, abstractmethod
import hashlib
import secrets

@dataclass
class Task:
    id: str
    description: str
    complexity: str
    dependencies: List[str]
    required_capabilities: List[str]
    created_at: datetime

class AICapability(ABC):
    @abstractmethod
    async def execute(self, task: Task) -> Any:
        pass

class StrategicIntelligence:
    def __init__(self):
        self.agent_registry = {}
        self.task_queue = []
        self.knowledge_base = {}
        self.performance_metrics = {}
        
    async def analyze_task(self, task_description: str) -> Task:
        task = Task(
            id=f"task_{len(self.task_queue)}_{secrets.token_hex(4)}",
            description=task_description,
            complexity=self._assess_complexity(task_description),
            dependencies=[],
            required_capabilities=await self._determine_required_capabilities(task_description),
            created_at=datetime.now()
        )
        return task
    
    def _assess_complexity(self, task: str) -> str:
        complexity_keywords = {
            'high': ['complex', 'strategic', 'multiple', 'integrate', 'analyze'],
            'medium': ['create', 'generate', 'process', 'manage'],
            'low': ['simple', 'basic', 'single', 'update']
        }
        
        task_lower = task.lower()
        score = 0
        for level, keywords in complexity_keywords.items():
            for keyword in keywords:
                if keyword in task_lower:
                    score += 1 if level == 'high' else 0.5 if level == 'medium' else 0.2
        
        return 'high' if score > 2 else 'medium' if score > 1 else 'low'
    
    async def _determine_required_capabilities(self, task: str) -> List[str]:
        capabilities_mapping = {
            'data_analysis': ['analyze', 'process', 'statistics', 'trends'],
            'content_creation': ['create', 'write', 'generate', 'content'],
            'social_media': ['post', 'social', 'tiktok', 'instagram', 'facebook'],
            'web_development': ['website', 'responsive', 'frontend', 'backend'],
            'payment_processing': ['payment', 'transaction', 'money', 'payout'],
            'compliance': ['compliance', 'legal', 'regulation', 'popi'],
            'security': ['security', 'encrypt', 'secure', 'protect']
        }
        
        required = []
        task_lower = task.lower()
        for capability, keywords in capabilities_mapping.items():
            if any(keyword in task_lower for keyword in keywords):
                required.append(capability)
                
        return required if required else ['general_ai']
