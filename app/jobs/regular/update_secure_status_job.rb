module Jobs
  class UpdateSecureStatusJob < ::Jobs::Base
    def execute(args)
      topic_id = args[:topic_id]
      topic = Topic.find_by(id: topic_id)
      return unless topic
  
      begin
        topic.image_upload.update_secure_status(override: false)
      rescue
        Rails.logger.error("Cannot update file sercue: #{topic.id}")
      end
    end
  end
end