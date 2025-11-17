/**
 * Template Comments Component
 * 
 * 선생님이 자주 사용하는 코멘트를 저장하고 빠르게 적용
 * 업무 시간 단축을 위한 자동화 도구
 */

import { useState, useEffect } from 'react';
import { useLanguage } from '../../i18n';
import {
  getTemplateComments,
  saveTemplateComment,
  deleteTemplateComment,
  TemplateComment,
} from '../../lib/api/mock/templateComments';
import {
  Modal,
  Button,
  Input,
  TextArea,
  Card,
  Badge,
  Text,
  Heading,
  Stack,
  Alert,
} from '../../design-system';
import { Plus, Trash2, Copy } from 'lucide-react';

interface TemplateCommentsProps {
  teacherId: string;
  onSelectTemplate: (comment: string) => void;
}

export const TemplateComments = ({ teacherId, onSelectTemplate }: TemplateCommentsProps) => {
  const { language } = useLanguage();
  const [templates, setTemplates] = useState<TemplateComment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('general');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    loadTemplates();
  }, [teacherId]);

  const loadTemplates = async () => {
    try {
      const data = await getTemplateComments(teacherId);
      setTemplates(data);
    } catch (error) {
      console.error('Failed to load templates:', error);
    }
  };

  const handleSave = async () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    setIsLoading(true);
    try {
      await saveTemplateComment(teacherId, {
        title: newTitle,
        content: newContent,
        category: selectedCategory,
      });
      await loadTemplates();
      setNewTitle('');
      setNewContent('');
      setIsModalOpen(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to save template:', error);
      alert(language === 'ko' ? '저장 실패' : 'Save failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(language === 'ko' ? '정말 삭제하시겠습니까?' : 'Delete this template?')) {
      return;
    }

    try {
      await deleteTemplateComment(id);
      await loadTemplates();
    } catch (error) {
      console.error('Failed to delete template:', error);
    }
  };

  const categoryColors: Record<string, string> = {
    praise: 'bg-green-100 text-green-700',
    improvement: 'bg-yellow-100 text-yellow-700',
    grammar: 'bg-blue-100 text-blue-700',
    vocabulary: 'bg-purple-100 text-purple-700',
    general: 'bg-gray-100 text-gray-700',
  };

  return (
    <Card>
      <Card.Body>
        <div className="flex items-center justify-between mb-4">
          <Heading level={4}>
            ⚡ {language === 'ko' ? '템플릿 코멘트' : 'Template Comments'}
          </Heading>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus size={16} />}
            onClick={() => setIsModalOpen(true)}
          >
            {language === 'ko' ? '추가' : 'Add'}
          </Button>
        </div>

        {showSuccess && (
          <Alert
            variant="success"
            description={language === 'ko' ? '템플릿이 저장되었습니다!' : 'Template saved!'}
            className="mb-3"
          />
        )}

        <Text variant="small" color="muted" className="mb-3">
          {language === 'ko'
            ? '자주 사용하는 코멘트를 저장하고 빠르게 적용하세요'
            : 'Save frequently used comments and apply them quickly'}
        </Text>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {templates.length === 0 ? (
            <div className="text-center py-8">
              <Text color="muted">
                {language === 'ko'
                  ? '저장된 템플릿이 없습니다. 첫 템플릿을 추가해보세요!'
                  : 'No templates yet. Add your first template!'}
              </Text>
            </div>
          ) : (
            templates.map((template) => (
              <div
                key={template.id}
                className="flex items-start justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Text weight="semibold" variant="small">
                      {template.title}
                    </Text>
                    <span className={`text-xs px-2 py-0.5 rounded ${categoryColors[template.category]}`}>
                      {template.category}
                    </span>
                    <Text variant="small" color="muted">
                      ({template.usageCount} {language === 'ko' ? '회 사용' : 'uses'})
                    </Text>
                  </div>
                  <Text variant="small" color="muted" className="line-clamp-2">
                    {template.content}
                  </Text>
                </div>
                <div className="flex gap-1 ml-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      onSelectTemplate(template.content);
                      navigator.clipboard.writeText(template.content);
                    }}
                  >
                    <Copy size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(template.id)}
                    className="text-red-600"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card.Body>

      {/* Add Template Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={language === 'ko' ? '템플릿 코멘트 추가' : 'Add Template Comment'}
      >
        <Stack direction="vertical" gap="md">
          <Input
            label={language === 'ko' ? '제목' : 'Title'}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder={language === 'ko' ? '예: 문법 오류 지적' : 'e.g., Grammar Error Feedback'}
            fullWidth
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ko' ? '카테고리' : 'Category'}
            </label>
            <div className="grid grid-cols-5 gap-2">
              {['praise', 'improvement', 'grammar', 'vocabulary', 'general'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-2 text-sm rounded-lg border-2 transition-colors ${
                    selectedCategory === cat
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <TextArea
            label={language === 'ko' ? '코멘트 내용' : 'Comment Content'}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder={language === 'ko'
              ? '예: 문법적으로 정확하지만, 시제 일관성에 주의하세요.'
              : 'e.g., Grammatically correct, but pay attention to tense consistency.'}
            rows={4}
            fullWidth
          />

          <Stack direction="horizontal" gap="sm" className="justify-end">
            <Button
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              disabled={isLoading}
            >
              {language === 'ko' ? '취소' : 'Cancel'}
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              isLoading={isLoading}
              disabled={!newTitle.trim() || !newContent.trim()}
            >
              {language === 'ko' ? '저장' : 'Save'}
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </Card>
  );
};

