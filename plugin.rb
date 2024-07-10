# frozen_string_literal: true

# name: discourse-topic-plugin
# about: Runs a custom script when a new topic is created, edited
# version: 0.1
# authors: Hoc Le

enabled_site_setting :plugin_name_enabled

module ::MyPluginModule
  PLUGIN_NAME = "discourse-plugin-name"
end

require_relative "lib/my_plugin_module/engine"


after_initialize do
    DiscourseEvent.on(:topic_created) do |topic, opts, user|
        next if topic.nil?

        Rails.logger.info("Edit topic created with ID: #{topic.id}")
        # Enqueue job to update secure status after 30 seconds
        Jobs.enqueue_in(30.seconds, :update_secure_status_job, topic_id: topic.id)
    end

    DiscourseEvent.on(:topic_edited) do |topic, opts, user|
        next if topic.nil?
  
        Rails.logger.info("Edit topic created with ID: #{topic.id}")
        # Enqueue job to update secure status after 30 seconds
        Jobs.enqueue_in(30.seconds, :update_secure_status_job, topic_id: topic.id)
    end
end