module Jobs
    class UpdateSecureStatusJob < ActiveJob::Base
      def perform(args)
        topic_id = args[:topic_id]
        topic = Topic.find_by(id: topic_id)
        return unless topic
  
        begin
          topic.image_upload.update_secure_status(override: false)
        rescue => e
          Rails.logger.error("Cannot update image secure status for topic ID #{topic.id}: #{e.message}")
        end
      end
    end
  end
  