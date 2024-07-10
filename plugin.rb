# name: topic_plugin
# about: Runs a custom script when a new topic is created, edited
# version: 0.1
# authors: Hoc Le

after_initialize do
    DiscourseEvent.on(:topic_created) do |topic, opts, user|
        next if topic.nil?

        Rails.logger.info("Edit topic created with ID: #{topic.id}")
        topic.image_upload.update_secure_status(override: false)
    end

    DiscourseEvent.on(:topic_edited) do |topic, opts, user|
      next if topic.nil?
  
      Rails.logger.info("Edit topic created with ID: #{topic.id}")
      topic.image_upload.update_secure_status(override: false)
    end
end